import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/dashboard/services/product.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-sale-schmuck',
  templateUrl: './sale-schmuck.component.html',
  styleUrls: ['./sale-schmuck.component.css']
})
export class SaleSchmuckComponent implements OnInit {

  jewelery: any [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAll().subscribe(data =>{
      this.jewelery = data.filter(a => a.model.category.category_name == 'Schmuck');
    })
  }

}
