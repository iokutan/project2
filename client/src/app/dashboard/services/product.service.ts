import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private serverUrl: string;
  constructor(private  http: HttpClient) {
    this.serverUrl = 'http://localhost:3001/products';
   }

  public create(product): Observable<Response> {
    return this.http.post(`${this.serverUrl}/${product.category_id}`, product).pipe(map((res: Response) => res));
  }

  public getAll(): Observable<any> {
    return this.http.get(`${this.serverUrl}`).pipe(map((res: Response) => res));
  }

  public getById(productId: string): Observable<any> {
    return this.http.get(`${this.serverUrl}/${productId}`).pipe(map((res: Response) => res));
  }

  public update(product: any): Observable<any> {
    console.log()
    return this.http.put(`${this.serverUrl}/${product.product_id}`, product).pipe(map((res: Response) => res));
  }

  public delete(product_id: string): Observable<any> {
    return this.http.delete(`${this.serverUrl}/${product_id}`).pipe(map((res: Response) => res));
  }
}
