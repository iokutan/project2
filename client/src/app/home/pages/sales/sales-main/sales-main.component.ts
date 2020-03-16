import {
  Component,
  OnInit
} from '@angular/core';
import { Feature } from 'src/app/Feature';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-sales-main',
  templateUrl: './sales-main.component.html',
  styleUrls: ['./sales-main.component.css']
})
export class SalesMainComponent implements OnInit {

  constructor() {}
  sales: Feature[] = [{
      title: 'Uhren in Sale',
      description: 'Solange vorrat',
      position: '',
      link: '/home/sales/sale-uhren',
      image: '/assets/images/watches.jpg'
    },

    {
      title: 'Schmuck in Sale',
      description: 'Speziele einheiten von uns',
      position: 'order-md-2',
      link: '/home/sales/sale-schmuck',
      image: '/assets/images/jewelery.jpg'
    }
  ];

  ngOnInit() {}

}
