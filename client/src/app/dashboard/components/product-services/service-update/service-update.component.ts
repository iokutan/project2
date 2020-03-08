import { Component, OnInit } from '@angular/core';
import { ProductOfferService } from 'src/app/dashboard/services/product-offer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/dashboard/services/product.service';

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
              private productService: ProductService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.param = params['product_id'];
    });
    this.productService.getAll().subscribe(data => {
      this.products = data;
    });
    this.getServiceDetails();
    this.createModelForm();
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
    });
  }

  update() {
    const form = this.serviceOfferForm.value;
    form.product_id = this.serviceOffer.product_id;
    this.productOfferService.update(form).subscribe(data => {
      this.serviceOffer = data;
    });
  }

  delete() {
    this.productOfferService.delete(this.serviceOffer.product_id).subscribe(data => {
      this.router.navigate(['/dashboard', 'service-list']);
    });
  }

}
