import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-watch-repair',
  templateUrl: './watch-repair.component.html',
  styleUrls: ['./watch-repair.component.css']
})
export class WatchRepairComponent implements OnInit {

  constructor() { }
    items: any [] = [
      { description: 'Bateriewechsel' },
      { description: 'Bandwechsel' },
      { description: 'Band Anpassen' },
      { description: 'Glas ersetzen' },
      { description: 'Krone wechseln' },
      { description: 'Gravuren' },
      { description: 'Zifferblatt Reparaturen' },
      { description: 'Zeiger Reparaturen' },
      { description: 'Teil Revision' },
      { description: 'Voll Revision' },
      { description: 'PENDEL UHREN REVISION' },
      { description: 'Und mehr' }
    ];
  ngOnInit() {
  }

}
