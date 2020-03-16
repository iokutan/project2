import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/dashboard/services/category.service';
import { ModelService } from 'src/app/dashboard/services/model.service';
import { ProductService } from 'src/app/dashboard/services/product.service';
import { ProductOfferService } from 'src/app/dashboard/services/product-offer.service';
import { OrderServiceService } from 'src/app/dashboard/services/order-service.service';
import { OrderItemService } from 'src/app/dashboard/services/order-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'cristal-orders-update',
  templateUrl: './orders-update.component.html',
  styleUrls: ['./orders-update.component.css']
})
export class OrdersUpdateComponent implements OnInit {
  categories: any[];
  models: any[];
  products: any[];
  services: any[];
  selectedServices: any[];
  productSelectionForm: FormGroup;
  orderForm: FormGroup;
  param: string;


  constructor(private categoryService: CategoryService,
    private modelService: ModelService,
    private productService: ProductService,
    private productOfferService: ProductOfferService,
    private orderService: OrderServiceService,
    private orderItemService: OrderItemService,
    private router: Router,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.param = params.id;
      this.getDetails(this.param);
    });

    this.setProductSelectionForm();
    this.setOrderForm();
    this.selectedServices = [];

    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }

  setProductSelectionForm(){
    this.productSelectionForm = this.fb.group({
      currentCategory: [ '', Validators.required],
      currentModel: [ '', Validators.required],
      currentProduct: [ '', Validators.required],
    });
  }

  setOrderForm(){
    this.orderForm = this.fb.group({
      name: [ '', Validators.required],
      discount: [ 0, Validators.required],
      total: [ 0, Validators.required],
      due_date: [ new Date(), Validators.required],
      status: [ 1, Validators.required],
      orderNumber: [ '', Validators.required],
      order_id: [ '', Validators.required]
    });
  }

  getDetails(id) {
    this.orderService.getById(id).subscribe(order => {
      this.selectedServices = order.order_items.map(a => a.service);
      this.orderForm.get('name').setValue(order.name);
      this.orderForm.get('discount').setValue(order.discount);
      this.orderForm.get('total').setValue(order.total);
      this.orderForm.get('due_date').setValue(new Date(order.due_date).toISOString().substring(0,10));
      this.orderForm.get('status').setValue(order.status);
      this.orderForm.get('orderNumber').setValue(order.orderNumber);
      this.orderForm.get('order_id').setValue(order.order_id);
    });
  }

  setModels(){
    const categoryId = this.productSelectionForm.get('currentCategory').value;
    this.modelService.getByCategory(categoryId).subscribe(models => {
      this.models = models;
      this.products = [];
      this.services = [];
    });
  }

  setProducts(){
    const modelId = this.productSelectionForm.get('currentModel').value;
    this.productService.getByModelId(modelId).subscribe(products => {
      this.products = products;
      this.services = [];
    });
  }

  setServices(){
    const productId = this.productSelectionForm.get('currentProduct').value;
    this.productOfferService.getByProductId(productId).subscribe(services => {
      this.services = services;
    });
  }

  setSelectedService(event, service){
    if(event.target.checked){
      this.selectedServices.push(service);
    } else{
      this.removeSelectedService(service);
    }
  }

  getTotal(services: any[]){
    const total = services.reduce((a, b) => { a += b.price; return a; }, 0);
    this.orderForm.get('total').setValue(total);
    return total;
  }

  removeSelectedService(service){
    this.selectedServices = this.selectedServices.filter(a => a.service_id != service.service_id);
  }

  updateOrder(){
    const form = this.orderForm.value;
    form.order_id = this.orderForm.get('order_id').value;

    if(this.orderForm.valid && (this.selectedServices.length > 0)) {
      this.orderService.update(form).subscribe(order => {

        this.selectedServices = this.selectedServices.map(a => {
          const item = {
             order_id: order['order_id'],
             discount: order['discount'],
             piece: 1,
             product_id: a.product_id,
             service_id: a.service_id
          };
          return item;
        });
 
        this.orderItemService.update(this.selectedServices, form.order_id)
        .subscribe(
          orderItems => {
          this.getDetails(form.order_id);
          this.notificationService.success('Order updated!');
          this.router.navigate(['/dashboard', 'dashboard-main']);
        },

        (response: HttpErrorResponse) => { 
          this.notificationService.error(`Order could not be updated! ${response.error}`); });
     });
    }
  }
}
