import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductOfferService {

  private serverUrl: string;
  constructor(private  http: HttpClient) {
    this.serverUrl = 'http://localhost:3001/productServices';
   }

  public create(service): Observable<Response> {
    return this.http.post(`${this.serverUrl}`, service, { headers: { 'Content-Type': 'application/json' }}).pipe(map((res: Response) => res));
  }

  public getAll(): Observable<any> {
    return this.http.get(`${this.serverUrl}`).pipe(map((res: Response) => res));
  }

  public getByProductId(productId): Observable<any> {
    return this.http.get(`${this.serverUrl}/byProduct/${productId}`).pipe(map((res: Response) => res));
  }

  public getById(service_id: string): Observable<any> {
    return this.http.get(`${this.serverUrl}/${service_id}`).pipe(map((res: Response) => res));
  }

  public update(service: any): Observable<any> {
    return this.http.put(`${this.serverUrl}/${service.service_id}`, service, { headers: { 'Content-Type': 'application/json' }}).pipe(map((res: Response) => res));
  }

  public delete(service_id: string): Observable<any> {
    return this.http.delete(`${this.serverUrl}/${service_id}`).pipe(map((res: Response) => res));
  }
}

