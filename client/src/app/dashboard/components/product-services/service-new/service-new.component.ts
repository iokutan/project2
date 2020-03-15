import { Component, OnInit } from '@angular/core';
import { ProductOfferService } from 'src/app/dashboard/services/product-offer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/dashboard/services/product.service';
import { NotificationService } from 'src/app/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'cristal-service-new',
  templateUrl: './service-new.component.html',
  styleUrls: ['./service-new.component.css']
})
export class ServiceNewComponent implements OnInit {

  serviceOfferForm: FormGroup;
  serviceOffer: any;
  products: any [];

  constructor(private productOfferService: ProductOfferService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              private productService: ProductService) { }

  ngOnInit() {
    this.createProductOfferForm();
    this.productService.getAll().subscribe(data => {
      this.products = data;
    });
  }

  createProductOfferForm() {
    this.serviceOfferForm = this.fb.group({
      discount: [ '', Validators.required],
      price: [ '', Validators.required],
      service_name: [ '', Validators.required],
      product_id: ['', Validators.required]
    });
  }

   add() {
    const form = this.serviceOfferForm.value;
    form.product_id = this.serviceOfferForm.get('product_id').value.product_id;
    this.productOfferService.create(form).subscribe(data => {
      this.serviceOffer = data;
      this.notificationService.success('Product Service added!');
      this.router.navigate(['/dashboard', 'products', 'service-list']);
    },
    (response: HttpErrorResponse) => { 
      this.notificationService.error(`Product Service could not be added! ${response.error}`); });
  }

}
