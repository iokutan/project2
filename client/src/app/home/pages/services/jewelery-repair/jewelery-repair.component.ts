import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-jewelery-repair',
  templateUrl: './jewelery-repair.component.html',
  styleUrls: ['./jewelery-repair.component.css']
})
export class JeweleryRepairComponent implements OnInit {

  constructor() { }
  items: any [] = [
    { description: 'Löten' },
    { description: 'Ring Anpassen' },
    { description: 'Stein ersetzen' },
    { description: 'Polieren' },
    { description: 'Reinigen' },
    { description: 'Gravuren' },
    { description: 'Spezialanfertigung' },
    { description: 'Oberfläche veredelung' },
    { description: 'Vergolden' },
    { description: 'Rhodieneren' },
    { description: 'Und mehr' },
  ];

  ngOnInit() {
  }

}
