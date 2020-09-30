import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageItems } from '../models';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.localStorageService.get(LocalStorageItems.user)) {
      console.log(this.localStorageService.get(LocalStorageItems.user));
      return true;
    } else {

      this.router.navigateByUrl('/login', {
        queryParams: { returnUrl: state.url }
      });

      return false;

    }

  }
}
