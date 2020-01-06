import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-sale-uhren',
  templateUrl: './sale-uhren.component.html',
  styleUrls: ['./sale-uhren.component.css']
})
export class SaleUhrenComponent implements OnInit {
   uhren: any;


  constructor(private uhrenService: SaleService) { }

  ngOnInit() {
    this.uhrenService.getSaleUhren().subscribe(data => {
      console.log(data);
      this.uhren = data;
    });
  }

}
