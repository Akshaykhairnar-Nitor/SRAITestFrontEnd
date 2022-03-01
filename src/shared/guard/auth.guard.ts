import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  public loggedInuserDetails: any; 
  constructor(private router: Router) { }

  canActivate() {
      if (localStorage.getItem('isLoggedin')) {
          this.loggedInuserDetails = JSON.parse(localStorage.getItem('LoggedinUser'));
          if (this.loggedInuserDetails) {
              return true;
          }
      }

      this.router.navigate(['/login']);
      return false;
  }
  
}
