import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-sale-schmuck',
  templateUrl: './sale-schmuck.component.html',
  styleUrls: ['./sale-schmuck.component.css']
})
export class SaleSchmuckComponent implements OnInit {

  jewelery: any;

  constructor(private schmuckService: SaleService) { }

  ngOnInit() {
    this.schmuckService.getSaleSchmuck().subscribe(data => {
      this.jewelery = data;
    });
  }

}
