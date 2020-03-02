import { Component, OnInit } from '@angular/core';
import { ArtikelService } from '../../services/artikel.service';

@Component({
  selector: 'cristal-artikels',
  templateUrl: './artikels.component.html',
  styleUrls: ['./artikels.component.css']
})
export class ArtikelsComponent implements OnInit {

  artikels: any;

  constructor(private artikelService: ArtikelService) { }

  ngOnInit() {
    this.artikelService.getAll().subscribe(data => {
      this.artikels = data;
    });
  }

}
