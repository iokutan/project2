import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenService } from 'src/app/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private serverUrl: string;
  constructor(private  http: HttpClient, tokenService: TokenService) {
    this.serverUrl = 'http://localhost:3001/products';
   }

  public create(product): Observable<Response> {
    return this.http.post(`${this.serverUrl}/create/${product.category_id}`, product, { headers: { 'Content-Type': 'application/json' }}).pipe(map((res: Response) => res));
  }
  
  public uploadFile(formData): Observable<any> {
    return this.http.post(`${this.serverUrl}/uploadImage`, formData).pipe(map((res: Response) => res));
  }

  public getAll(): Observable<any> {
    return this.http.get(`${this.serverUrl}`).pipe(map((res: Response) => res));
  }

  public getByModelId(modelId): Observable<any> {
    return this.http.get(`${this.serverUrl}/byModel/${modelId}`).pipe(map((res: Response) => res));
  }

  public getById(productId: string): Observable<any> {
    return this.http.get(`${this.serverUrl}/${productId}`).pipe(map((res: Response) => res));
  }

  public update(product: any): Observable<any> {
    return this.http.put(`${this.serverUrl}/${product.product_id}`, product, { headers: { 'Content-Type': 'application/json' }}).pipe(map((res: Response) => res));
  }

  // tslint:disable-next-line:variable-name
  public delete(product_id: string): Observable<any> {
    return this.http.delete(`${this.serverUrl}/${product_id}`).pipe(map((res: Response) => res));
  }
}
