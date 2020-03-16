import {
  Component,
  OnInit
} from '@angular/core';
import {
  Feature
} from 'src/app/Feature';
import { ArtikelService } from 'src/app/dashboard/services/artikel.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cristal-aktuel',
  templateUrl: './aktuel.component.html',
  styleUrls: ['./aktuel.component.css']
})
export class AktuelComponent implements OnInit {
  artikels: any [];

  constructor(private artikelservice: ArtikelService) {  
  }

  ngOnInit() {
    this.artikelservice.getAll().subscribe(data =>{
      this.artikels = data.filter(a => a.category.category_name == 'Aktuel');
    })
  }

}
