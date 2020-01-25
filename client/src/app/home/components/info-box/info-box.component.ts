import {
  Component,
  OnInit
} from '@angular/core';
import {
  Feature
} from 'src/app/Feature';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.css']
})
export class InfoBoxComponent implements OnInit {

  constructor() {}
  infoboxes: Feature[] = [{
      title: 'Uhren Ankauf',
      description: 'Wir antworten Ihnen innerhalb weniger Stunden auf Ihre Anfrage mit einem Vorabangebot.',
      link: '/uhren-ankauf',
      position: '',
      image: '/assets/images/uhren-ankauf.png'
    },

    {
      title: 'Gold Ankauf',
      description: 'Die Anfragen sind natürlich für Sie absolut unverbindlich und kostenfrei.',
      link: '/gold-ankauf',
      position: '',
      image: '/assets/images/gold-ankauf.jpg'
    },

    {
      title: 'Nachfrage',
      description: 'Stellen Sie Ihre Fragen nach Verfügbarkeit und Preise oder Spezielanfertigung.',
      link: '/offerte',
      position: '',
      image: '/assets/images/nachfrage.png'
    },

  ];
  ngOnInit() {}

}
