import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

// Providers
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private _router: Router) {}

  canActivate(): boolean {
    if (this.auth.isAutenticated()) {
      return true;
    } else {
      this._router.navigateByUrl('/login');
      return false;
    }
  }

}
