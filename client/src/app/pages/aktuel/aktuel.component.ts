import {
  Component,
  OnInit
} from '@angular/core';
import {
  Feature
} from 'src/app/Feature';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-aktuel',
  templateUrl: './aktuel.component.html',
  styleUrls: ['./aktuel.component.css']
})
export class AktuelComponent implements OnInit {

  constructor() {}
  aktuels: Feature[] = [{
      title: 'Valentinstag Aktion',
      description: '20% Rabatt auf alle Uhren Ab 1. Februar bis 14 Februar !',
      position: '',
      link: '',
      image: '/assets/images/valentinstag.jpg'
    },

    {
      title: 'Bateriewechsel Aktion',
      description: 'Ab 03. März bis 18. März ist Bateriewechsel statt 18.- CHF für 10.-CHF',
      position: 'order-md-2',
      link: '',
      image: '/assets/images/batterie.jpg'
    }
  ];

  ngOnInit() {}

}
