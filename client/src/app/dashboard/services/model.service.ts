import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private serverUrl: string;
  constructor(private  http: HttpClient) {
    this.serverUrl = 'http://localhost:3001/productModels';
   }

  public create(model): Observable<Response> {
    return this.http.post(`${this.serverUrl}/${model.category_id}`, model).pipe(map((res: Response) => res));
  }

  public getAll(): Observable<any> {
    return this.http.get(`${this.serverUrl}`).pipe(map((res: Response) => res));
  }

  public getById(modelId: string): Observable<any> {
    return this.http.get(`${this.serverUrl}/${modelId}`).pipe(map((res: Response) => res));
  }

  public update(model: any): Observable<any> {
    console.log()
    return this.http.put(`${this.serverUrl}/${model.model_id}`, model).pipe(map((res: Response) => res));
  }

  public delete(model_id: string): Observable<any> {
    return this.http.delete(`${this.serverUrl}/${model_id}`).pipe(map((res: Response) => res));
  }
}

