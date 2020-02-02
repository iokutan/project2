import { Injectable } from '@angular/core';
import { AppHttpService } from './http.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private appHttpService: AppHttpService,
              private tokenService: TokenService) { }

  login(email, password): Observable<Response> {
    const loginparams = {
      username: email || 'admin@gmail.com',
      password: password || '99032',
      grant_type: 'password'
    };
    console.log(loginparams);
    return this.appHttpService.post('oauth/token', loginparams)
      .pipe(
        map((token) => {
          console.log(token);
          this.tokenService.setToken(token);
          return token;
        }),
        catchError((err) => {
          return of(err);
        })
      );
  }
}
