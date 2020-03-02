import { Component, OnInit } from '@angular/core';
import { ProductOfferService } from 'src/app/dashboard/services/product-offer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cristal-service-update',
  templateUrl: './service-update.component.html',
  styleUrls: ['./service-update.component.css']
})
export class ServiceUpdateComponent implements OnInit {

  productOfferForm: FormGroup;
  productOffer: any;

  constructor(private productOfferService: ProductOfferService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.createModelForm();
  }
  createModelForm() {
    this.productOfferForm = this.fb.group({
      orderName: [ '', Validators.required],
      price: [ '', Validators.required],
      productName: [ '', Validators.required],
      serviceName: [ '', Validators.required],

    });
  }

  update() {
    const form = this.productOfferForm.value;
    form.product_id = this.productOffer.product_id;
    this.productOfferService.update(form).subscribe(data => {
      this.productOffer = data;
    });
  }

  delete() {
    this.productOfferService.delete(this.productOffer.product_id).subscribe(data => {
      this.router.navigate(['/dashboard', 'service-list']);
    });
  }

}
