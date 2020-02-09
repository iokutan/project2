import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthorizedGuard implements CanActivate {

  constructor(private tokenservice: TokenService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.tokenservice.getToken();
    // Check whether the token is expired and return
    // true or false
    try {
      if (this.tokenservice.isTokenExpired(token.access_token)) {
        this.router.navigate(['/home','login']);
        return false;
      }
      return true;
    } catch (error) {
      this.router.navigate(['/home','login']);
      return false;
    }
  }
}