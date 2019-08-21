import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books/books.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ManageComponent } from './manage/manage.component';
import { NoAdminGuard } from './guards/noAdmin.guard';
import { CreateBookCanDeactivateGuard } from './manage/create-book-can-deactivate.guard';
import { CanDeactivate } from '@angular/router';
import { RegisterUserCanDeactivateGuard } from './guards/register-user-can-deactivate.guard';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { DisplayBookComponent } from './books/display-book/display-book.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CartComponent } from './Cart/cart.component';
import { BuyBookComponent } from './buy-book/buy-book.component';
import { MybookComponent } from './mybook/mybook.component';
import { ClientDataComponent } from './client-data/client-data.component';
import { AdminGuard } from './guards/admin.guard';

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
  },
  {
    path : 'mybooks',
    component : MybookComponent,
    canActivate : [AuthGuard, NoAdminGuard]
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
    path: 'cart',
    component : CartComponent,
    canActivate : [AuthGuard, NoAdminGuard]

  },
  {
    path: 'buy',
    component : BuyBookComponent,
    canActivate : [AuthGuard, NoAdminGuard]

  },

  {
    path: 'clients',
    component : ClientDataComponent,
    canActivate : [AuthGuard, AdminGuard]

  },


  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
