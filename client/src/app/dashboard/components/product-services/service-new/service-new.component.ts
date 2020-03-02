import { Component, OnInit } from '@angular/core';
import { ProductOfferService } from 'src/app/dashboard/services/product-offer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cristal-service-new',
  templateUrl: './service-new.component.html',
  styleUrls: ['./service-new.component.css']
})
export class ServiceNewComponent implements OnInit {

  productOfferForm: FormGroup;
  productOffer: any;


  constructor(private productOfferService: ProductOfferService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.createProductOfferForm();
  }

  createProductOfferForm() {
    this.productOfferForm = this.fb.group({
      orderName: [ '', Validators.required],
      price: [ '', Validators.required],
      productName: [ '', Validators.required],
      serviceName: [ '', Validators.required],

    });
  }

   add() {
    const form = this.productOfferForm.value;
    this.productOfferService.create(form).subscribe(data => {
      this.productOffer = data;
    });
  }

}
