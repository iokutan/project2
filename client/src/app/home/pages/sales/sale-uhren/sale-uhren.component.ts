import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/services/sale.service';
import { ArtikelService } from 'src/app/dashboard/services/artikel.service';
import { ProductService } from 'src/app/dashboard/services/product.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-sale-uhren',
  templateUrl: './sale-uhren.component.html',
  styleUrls: ['./sale-uhren.component.css']
})
export class SaleUhrenComponent implements OnInit {
   uhren: any [];
   constructor(private productService: ProductService) {}
 
   ngOnInit() {
     this.productService.getAll().subscribe(data =>{
       this.uhren = data.filter(a => a.model.category.category_name == 'Uhren');
     })
   }

}
