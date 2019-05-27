import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { SpecialbooksComponent } from './specialbooks/specialbooks.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : '/books',
    pathMatch : 'full'
  },
  {
    path : 'books',
    component : BooksComponent
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
    component : RegisterComponent
  },/*
  {
    path : 'manage',
    component : ManageComponent
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
