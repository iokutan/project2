import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtikelService {

  private serverUrl: string;
  constructor(private  http: HttpClient) {
    this.serverUrl = 'http://localhost:3001/artikels';
   }

  public create(artikel): Observable<Response> {
    return this.http.post(`${this.serverUrl}`, artikel, { headers: { 'Content-Type': 'application/json' }}).pipe(map((res: Response) => res));
  }

  public getAll(): Observable<any> {
    return this.http.get(`${this.serverUrl}`).pipe(map((res: Response) => res));
  }

  public getById(artikel_id: string): Observable<any> {
    return this.http.get(`${this.serverUrl}/${artikel_id}`).pipe(map((res: Response) => res));
  }

  public update(artikel: any): Observable<any> {
    return this.http.put(`${this.serverUrl}/${artikel.artikel_id}`, artikel, { headers: { 'Content-Type': 'application/json' }}).pipe(map((res: Response) => res));
  }

  public delete(artikel_id: string): Observable<any> {
    return this.http.delete(`${this.serverUrl}/${artikel_id}`).pipe(map((res: Response) => res));
  }
}
