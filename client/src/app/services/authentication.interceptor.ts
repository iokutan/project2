import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpParams, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, from} from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if ( TokenService.getToken()) {
      const token = TokenService.getToken();
      const contentType = req.headers.get('Content-Type');

      req = req.clone({
          body: req.serializeBody(),
          setHeaders: {
            Accept       : 'application/json',
            Authorization: `Bearer ${token.access_token}`,
          },
        });
    }
    return next.handle(req);
  }
}

