import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  private serverUrl: string;
  constructor(private  http: HttpClient) {
    this.serverUrl = 'http://localhost:3001/orderItems';
   }

  public create(client): Observable<Response> {
    return this.http.post(`${this.serverUrl}`, client, { headers: { 'Content-Type': 'application/json' }}).pipe(map((res: Response) => res));
  }

  public getAll(): Observable<any> {
    return this.http.get(`${this.serverUrl}`).pipe(map((res: Response) => res));
  }

  public getById(orderId: string): Observable<any> {
    return this.http.get(`${this.serverUrl}/${orderId}`).pipe(map((res: Response) => res));
  }

  public update(services: any, orderId: any): Observable<any> {
    return this.http.put(`${this.serverUrl}/${orderId}`, services, { headers: { 'Content-Type': 'application/json' }}).pipe(map((res: Response) => res));
  }

  public delete(orderId: string): Observable<any> {
    return this.http.delete(`${this.serverUrl}/${orderId}`).pipe(map((res: Response) => res));
  }
}

