import { Component, OnInit } from '@angular/core';
import { ProductOfferService } from 'src/app/dashboard/services/product-offer.service';

@Component({
  selector: 'cristal-service-new',
  templateUrl: './service-new.component.html',
  styleUrls: ['./service-new.component.css']
})
export class ServiceNewComponent implements OnInit {

  constructor(private productOfferService: ProductOfferService) { }

  ngOnInit() {
  }

}
