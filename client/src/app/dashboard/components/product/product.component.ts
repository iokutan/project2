import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any[];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAll().subscribe(data => {
      this.products = data;
    });
  }

}
