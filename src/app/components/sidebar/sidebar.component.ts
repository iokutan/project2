import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }
  lines: any [] = [
    { title: 'Auftrag Verfolgen',
      description: 'Erfahren Sie mehr über Status Ihren Auftrag.',
      position: '',
      link: '/tracking',
      image: '/assets/images/tracking.jpg'},
    { title: 'Termin Vereinbaren',
      description: 'Vermeiden Sie ungewünschte Wartezeiten.',
      position: 'order-md-2',
      link: '/appointment',
      image: '/assets/images/termin.jpg'}
  ];

  ngOnInit() {
  }

}
