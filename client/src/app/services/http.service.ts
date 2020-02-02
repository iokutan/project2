import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class AppHttpService {
  private headers: HttpHeaders;
  private serverUrl: string;
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.serverUrl = 'http://localhost:3001/';
  }

  post(endpoint, data): Observable<any> {
    console.log("sdlknfaälskdfn", endpoint, data, `${this.serverUrl}${endpoint}`);
    return this.http.post(`${this.serverUrl}${endpoint}`, data);
  }

  get(endpoint): Observable<any> {
    return this.http.get(`${this.serverUrl}${endpoint}`);
  }
}
