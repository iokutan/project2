import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/dashboard/services/category.service';
import { ModelService } from 'src/app/dashboard/services/model.service';
import { ProductService } from 'src/app/dashboard/services/product.service';
import { ProductOfferService } from 'src/app/dashboard/services/product-offer.service';
import { OrderServiceService } from 'src/app/dashboard/services/order-service.service';
import { OrderItemService } from 'src/app/dashboard/services/order-item.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  param: any;
  order: any;
  selectedServices: any[];
  productSelectionForm: FormGroup;
  orderForm: FormGroup;

  constructor(private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private modelService: ModelService,
    private productService: ProductService,
    private productOfferService: ProductOfferService,
    private orderService: OrderServiceService,
    private orderItemService: OrderItemService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.setProductSelectionForm();
    this.setOrderForm();
    this.route.params.subscribe(params => {
      this.param = params['id'];
      this.orderService.getAll().subscribe(data => {
        this.products = data;
      });
    });
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
    this.orderItemService.getById(this.param).subscribe(data => {
      this.order = data;
      
      this.orderForm.get('name').setValue(this.order.name)
      this.orderForm.get('discount').setValue(this.order.discount)
      this.orderForm.get('total').setValue(this.order.total)
      this.orderForm.get('due_date').setValue(this.order.due_date)
      this.orderForm.get('status').setValue(this.order.status)
      this.orderForm.get('orderNumber').setValue(this.order.orderNumber)

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
    form.product_id = this.order.product_id;
      this.orderService.update(form).subscribe(data => {

        this.selectedServices = this.selectedServices.map(a => {
          const item = {
             order_id: data['order_id'],
             discount: data['discount'],
             piece: 1,
             product_id: a.product_id
          };
          return item;
        });
     });
    }
  }
