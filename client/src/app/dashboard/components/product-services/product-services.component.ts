import { Component, OnInit } from '@angular/core';
import { ProductOfferService } from '../../services/product-offer.service';
import { ProductService } from '../../services/product.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-product-services',
  templateUrl: './product-services.component.html',
  styleUrls: ['./product-services.component.css']
})
export class ProductServicesComponent implements OnInit {

  products: any[];

  constructor(private productOfferService: ProductOfferService) { }

  ngOnInit() {
    this.productOfferService.getAll().subscribe(data => {
      this.products = data;
    });
  }

}
