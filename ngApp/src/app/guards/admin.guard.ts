import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  Router, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot,
  CanActivateChild
 } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate /*, CanActivateChild */{
  
  constructor(private _authService : AuthService, private _router : Router){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   
    const allowedRoles = next.data.allowedRoles;
    const isAuthorized = this._authService.isAuthorized(allowedRoles);
  
  if (!isAuthorized) {
      this._router.navigate(['/books']);
    }
    
  return isAuthorized;
  
 
  }
/*
  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    const allowedRoles = next.data.allowedRoles;
    const isAuthorized = this._authService.isAuthorized(allowedRoles);
  
  if (!isAuthorized) {
      this._router.navigate(['/login']);
    }
  
  return isAuthorized
  }
*/
  }
