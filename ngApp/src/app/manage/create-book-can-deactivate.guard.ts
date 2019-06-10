import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanDeactivate } from '@angular/router';
import { ManageComponent } from './manage.component';

@Injectable({
  providedIn: 'root'
})
export class CreateBookCanDeactivateGuard implements  CanDeactivate <ManageComponent>{

  canDeactivate(component: ManageComponent): boolean {
    if(component.createBookForm.dirty){
      return confirm("Are you sure?")
    }
    return true;
  }
}
