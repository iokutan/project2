import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private serverUrl: string;
  constructor() {
    this.serverUrl = '';
   }

  public getSaleUhren(): Observable<any> {
    const data =  [
      { id: 1, image: '/assets/images/rado.jpg', name: 'Rado', model: 'Automatic', price: '2890' },
      { id: 2, image: '/assets/images/tissot.jpg', name: 'Tissot', model: 'Quartz', price: '1200' },
      { id: 3, image: '/assets/images/certina.jpg', name: 'Certina', model: 'Quartz', price: '650' },
      { id: 4, image: '/assets/images/swatch.jpg', name: 'Swatch', model: 'Automatic', price: '150' },
      { id: 5, image: '/assets/images/seiko.jpg', name: 'Seiko', model: 'Mekanik', price: '350' }
    ];

    return of(data);
  }

}
