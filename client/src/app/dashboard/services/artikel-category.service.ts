import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtikelCategoryService {

  private serverUrl: string;
  constructor(private  http: HttpClient) {
    this.serverUrl = 'http://localhost:3001/artikelCategories';
   }

  public create(category): Observable<Response> {
    return this.http.post(`${this.serverUrl}`, category, { headers: { 'Content-Type': 'application/json' }}).pipe(map((res: Response) => res));
  }

  public getAll(): Observable<any> {
    return this.http.get(`${this.serverUrl}`).pipe(map((res: Response) => res));
  }

  public getById(categoryId: string): Observable<any> {
    return this.http.get(`${this.serverUrl}/${categoryId}`).pipe(map((res: Response) => res));
  }

  public update(category: any): Observable<any> {
    console.log()
    return this.http.put(`${this.serverUrl}/${category.category_id}`, category, { headers: { 'Content-Type': 'application/json' }}).pipe(map((res: Response) => res));
  }

  public delete(category_id: string): Observable<any> {
    return this.http.delete(`${this.serverUrl}/${category_id}`).pipe(map((res: Response) => res));
  }
}