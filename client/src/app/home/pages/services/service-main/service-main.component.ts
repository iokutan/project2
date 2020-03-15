import { Component, OnInit } from '@angular/core';
import { Feature } from 'src/app/Feature';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-service-main',
  templateUrl: './service-main.component.html',
  styleUrls: ['./service-main.component.css']
})
export class ServiceMainComponent implements OnInit {

  constructor() { }
  repairs: Feature [] = [
    { title: 'Uhren Reparatur',
      description: '',
      position: '',
      link: '/home/services/uhren-reparatur',
      image: '/assets/images/watch-repair.jpg'},

    { title: 'Schmuck Reparatur',
      description: '',
      position: 'order-md-2',
      link: '/home/services/schmuck-reparatur',
      image: '/assets/images/jewelery-repair.jpg'}
  ];
  ngOnInit() {
  }

}
