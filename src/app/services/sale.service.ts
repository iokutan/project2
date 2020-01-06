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
      { id: 1, image: '/assets/images/goldsmith.jpg', name: 'Rado', description: 'Automatic, Herren Uhr Keramik', price: '890' },
      { id: 2, image: '/assets/images/goldsmith.jpg', name: 'Tissot', description: 'Quartz, Herren Uhr Keramik', price: '1200' },
      { id: 3, image: '/assets/images/goldsmith.jpg', name: 'Quartz', description: 'Quartz, Herren Uhr Keramik', price: '450' },
      { id: 4, image: '/assets/images/goldsmith.jpg', name: 'Sony', description: 'Automatic, Herren Uhr Keramik', price: '1500' },
      { id: 5, image: '/assets/images/goldsmith.jpg', name: 'Citizen', description: 'Mekanik, Herren Uhr Keramik', price: '350' }
    ];

    return of(data);
  }

}
