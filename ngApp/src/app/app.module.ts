import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from "./material/material.module";
import { StoreModule, reduceState } from "@ngrx/store";

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BooksComponent } from './books/books/books.component';
import { AuthService } from './service/auth.service';
import { BooksService } from './service/books.service';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManageComponent } from './manage/manage.component';
import { NoAdminGuard } from './guards/noAdmin.guard';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator.directive';
import { DisplayBookComponent } from './books/display-book/display-book.component';
import { CreateBookCanDeactivateGuard } from './manage/create-book-can-deactivate.guard';
import { RegisterUserCanDeactivateGuard } from './guards/register-user-can-deactivate.guard';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { DialogEditBookComponent } from './books/dialog-edit-book/dialog-edit-book.component';
import { NotificationService } from './service/notification.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { reducer } from './states/card-states/cart-store';
import { CartComponent } from './Cart/cart.component';
import { reducerUser } from './states/user-state/user-store';
import { BuyBookComponent } from './buy-book/buy-book.component';
import { MybookComponent } from './mybook/mybook.component'
import { CartService } from './service/cart.service';
import { ClientDataComponent } from './client-data/client-data.component';
import { ClientServiceService } from './service/client-service.service';
import { AdminGuard } from './guards/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    RegisterComponent,
    LoginComponent,
    BooksComponent,
    ConfirmEqualValidatorDirective,
    ManageComponent,
    DisplayBookComponent,
    BookDetailsComponent,
    DialogEditBookComponent,
    PageNotFoundComponent,
    BuyBookComponent,
    MybookComponent,
    ClientDataComponent,
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule, 
    StoreModule.forRoot({
      booksCart: reducer,
      userData: reducerUser
    }),
    AppRoutingModule
  ],
providers: [ AuthService, BooksService, AuthGuard, NoAdminGuard,CreateBookCanDeactivateGuard, 
      RegisterUserCanDeactivateGuard, NotificationService, CartService, ClientServiceService,NoAdminGuard,
       AdminGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  entryComponents: [DialogEditBookComponent, DisplayBookComponent, ManageComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  
}
