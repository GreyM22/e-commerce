import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterComponent } from './register.component';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserCanDeactivateGuard implements CanDeactivate <RegisterComponent> {
  
  canDeactivate(component: RegisterComponent): boolean {
    if(component.registerForm.dirty){
      return confirm("Are you sure?")
    }
    return true;
  }

}
