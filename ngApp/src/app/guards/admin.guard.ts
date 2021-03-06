import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private _authService : AuthService, private _router : Router){}

  canActivate(): boolean {
   
    const isAuthorized = this._authService.isAuthorized(['admin']);
  
  if (!isAuthorized) {
      this._router.navigate(['/books']);
      return false
    }
    
  return isAuthorized;
  
 
  }
  }
