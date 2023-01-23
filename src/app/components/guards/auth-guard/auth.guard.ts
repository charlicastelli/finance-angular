import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    
    return this.checkAccess();
    
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean>  |boolean {

    return this.checkAccess();
  }


  private checkAccess() {
    if (this.authService.authenticatedUser()) {
      return true;
    }

    this.router.navigate(['']);
    
    return false;
  }
}
