import { Component, OnInit } from '@angular/core';
import { Feature } from 'src/app/Feature';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor() { }
  sliders: Feature[] = [{
    title: 'Goldschmied und Uhrenmacher vor Ort!',
    description: 'Ab Januar 2020 ist auch unser Goldschmied für Sie vor Ort da!',
    link: '/services/service-main',
    position: 'active',
    image: '/assets/images/goldsmith.jpg'
  },

  {
    title: 'Online Offerte einholen für Ihr Altgold, Markenuhr oder Nachfrage !',
    description: 'Die Anfragen sind natürlich für Sie absolut unverbindlich und kostenfrei.',
    link: '/contact',
    position: '',
    image: '/assets/images/ankauf-gold2.jpg'
  },

  {
    title: 'Valentinstag Aktion',
    description: ' Geschenk für ihn <=> Geschenk für sie',
    link: '/aktuel',
    position: '',
    image: '/assets/images/valentinstag2.jpg'
  },

];
  ngOnInit() {
  }

}
