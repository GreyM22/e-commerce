import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  Router, 
 } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAdminGuard implements CanActivate {
  
  constructor(private _authService : AuthService, private _router : Router){}

  canActivate(): boolean {
   
    const isAuthorized = this._authService.isAuthorized(['admin']);
  
  if (isAuthorized) {
      this._router.navigate(['/books']);
      return false
    }
    
  return !isAuthorized;
  
 
  }
  }
