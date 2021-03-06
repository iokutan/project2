import { Component, OnInit } from '@angular/core';
import { ProductOfferService } from 'src/app/dashboard/services/product-offer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/dashboard/services/product.service';
import { NotificationService } from 'src/app/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'cristal-service-update',
  templateUrl: './service-update.component.html',
  styleUrls: ['./service-update.component.css']
})
export class ServiceUpdateComponent implements OnInit {

  serviceOfferForm: FormGroup;
  serviceOffer: any;
  products: any;
  param : any;

  constructor(private productOfferService: ProductOfferService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              private productService: ProductService) { }

  ngOnInit() {
    this.createModelForm();
    this.route.params.subscribe(params => {
      this.param = params['id'];
      this.productService.getAll().subscribe(data => {
        this.products = data;
      });
    });
    
    this.getServiceDetails();
  }
  createModelForm() {
    this.serviceOfferForm = this.fb.group({
      discount: [ '', Validators.required],
      price: [ '', Validators.required],
      service_name: [ '', Validators.required],
      product_id: ['', Validators.required]

    });
  }

  getServiceDetails(){
    this.productOfferService.getById(this.param).subscribe(data => {
      this.serviceOffer = data;
      
      this.serviceOfferForm.get('product_id').setValue(this.serviceOffer.product_id)
      this.serviceOfferForm.get('discount').setValue(this.serviceOffer.discount)
      this.serviceOfferForm.get('service_name').setValue(this.serviceOffer.service_name)
      this.serviceOfferForm.get('price').setValue(this.serviceOffer.price)
    });
  }

  update() {
    const form = this.serviceOfferForm.value;
    form.product_id = this.serviceOffer.product_id;
    form.service_id = this.serviceOffer.service_id;
    this.productOfferService.update(form)
    .subscribe(
      (data) => {
        this.notificationService.success('Product Service updated!');
        this.serviceOffer = data;
        this.router.navigate(['/dashboard', 'products', 'service-list']);
    },
    (response: HttpErrorResponse) => { 
      this.notificationService.error(`Product Service could not be updated! ${response.error}`); });
  }

  delete() {
    this.productOfferService.delete(this.serviceOffer.service_id)
    .subscribe(
      (data) => {
        this.notificationService.success('Product Service deleted!');
      this.router.navigate(['/dashboard', 'products','service-list']);
    },
    (response: HttpErrorResponse) => { 
      this.notificationService.error(`Product could not be deleted! ${response.error}`); });
  }

}
