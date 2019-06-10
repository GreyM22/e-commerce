import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books/books.component';
import { SpecialbooksComponent } from './specialbooks/specialbooks.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ManageComponent } from './manage/manage.component';
import { AdminGuard } from './guards/admin.guard';
import { CreateBookCanDeactivateGuard } from './manage/create-book-can-deactivate.guard';
import { CanDeactivate } from '@angular/router';
import { RegisterUserCanDeactivateGuard } from './register/register-user-can-deactivate.guard';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { DisplayBookComponent } from './books/display-book/display-book.component';
import { CanActivateChildGuardGuard } from './guards/can-activate-child-guard.guard';

const routes: Routes = [
  {
    path : '',
    redirectTo : '/books',
    pathMatch : 'full'
  },
  {
    path : 'books/:id',
    component : BookDetailsComponent
  },
  {
    path : 'books',
    component : BooksComponent,
    /*children:[
      {
        path: 'dialog',
        component: DisplayBookComponent
      }
      
    ]*/
  },
  
  {
    path : 'specialbooks',
    component : SpecialbooksComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'login',
    component : LoginComponent,
  },
  {
    path : 'register',
    component : RegisterComponent,
    canDeactivate: [RegisterUserCanDeactivateGuard]
  },
  {
    path : 'manage',
    component : ManageComponent,
    data : {
      allowedRoles:['admin']
    },
    canActivate : [AdminGuard],
    canDeactivate: [CreateBookCanDeactivateGuard]
  },
  { path: '**', redirectTo: '/book' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
