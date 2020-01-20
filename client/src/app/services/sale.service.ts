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

  public getSaleSchmuck(): Observable<any> {
    const data =  [
      { id: 1, image: '/assets/images/ring.jpeg', name: 'Damenring', model: 'Gold', price: '890' },
      { id: 2, image: '/assets/images/halskette.jpg', name: 'Herren Halskette', model: 'Silber', price: '200' },
      { id: 3, image: '/assets/images/diamant.jpg', name: 'Diamant Set', model: 'Gold/Diamant', price: '1650' },
      { id: 4, image: '/assets/images/babyschmuck.jpg', name: 'Baby Braccelet', model: 'Gold', price: '450' },
      { id: 5, image: '/assets/images/ohrring.jpeg', name: 'Ohrringe', model: 'Swarowski', price: '350' }
    ];

    return of(data);
  }

}
