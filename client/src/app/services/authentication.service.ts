import { Injectable } from '@angular/core';
import { AppHttpService } from './http.service';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError  } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private appHttpService: AppHttpService,
              private tokenService: TokenService) { }

  login(email, pswd): Observable<Response> {
    const loginparams = {
      username: email,
      password: pswd,
      grant_type: 'password'
    };
    return this.appHttpService.post('oauth/token', loginparams)
      .pipe(
        map((token) => {
          this.tokenService.setToken(token);
          return token;
        }),
        catchError((err) => throwError(new Error(err)))
      );
  }

  logout(): Observable<Response> {
    return this.appHttpService.post('oauth/logout', {})
      .pipe(
        catchError((err) => throwError(new Error(err)))
      );
  }
}
