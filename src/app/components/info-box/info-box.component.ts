import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.css']
})
export class InfoBoxComponent implements OnInit {

  constructor() { }
  items: any [] = [
    { title: 'Uhren Ankauf',
      description: 'Wir antworten Ihnen innerhalb weniger Stunden auf Ihre Anfrage mit einem Vorabangebot.',
      link: '/uhren-ankauf',
      image: '/assets/images/uhren-ankauf.jpg'},
    { title: 'Gold Ankauf',
      description: 'Die Anfragen sind natürlich für Sie absolut unverbindlich und kostenfrei.',
      link: '/gold-ankauf',
      image: '/assets/images/gold-ankauf.jpeg'},
    { title: 'Nachfrage',
      description: 'Stellen Sie Ihre Fragen nach Verfügbarkeit und Preise oder Spezielanfertigung.',
      link: '/offerte',
      image: '/assets/images/nachfrage.jpg'},

  ];
  ngOnInit() {
  }

}
