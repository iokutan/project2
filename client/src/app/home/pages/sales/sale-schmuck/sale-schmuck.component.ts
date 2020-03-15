import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/services/sale.service';
import { ArtikelService } from 'src/app/dashboard/services/artikel.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-sale-schmuck',
  templateUrl: './sale-schmuck.component.html',
  styleUrls: ['./sale-schmuck.component.css']
})
export class SaleSchmuckComponent implements OnInit {

  jewelery: any;

  constructor(private artikelService: ArtikelService) { }

  ngOnInit() {
    this.artikelService.getAll().subscribe(data => {
      console.log("haloo", data)
      //this.jewelery = data.filter(a => a.category.category_name == );
    });
  }

}
