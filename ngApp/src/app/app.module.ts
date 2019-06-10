import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from "./material/material.module";


import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BooksComponent } from './books/books/books.component';
import { SpecialbooksComponent } from './specialbooks/specialbooks.component';
import { AuthService } from './service/auth.service';
import { BooksService } from './service/books.service';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManageComponent } from './manage/manage.component';
import { AdminGuard } from './guards/admin.guard';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator.directive';
import { DisplayBookComponent } from './books/display-book/display-book.component';
import { CreateBookCanDeactivateGuard } from './manage/create-book-can-deactivate.guard';
import { RegisterUserCanDeactivateGuard } from './register/register-user-can-deactivate.guard';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { DialogEditBookComponent } from './books/dialog-edit-book/dialog-edit-book.component';
import { NotificationService } from './service/notification.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    BooksComponent,
    SpecialbooksComponent,
    ConfirmEqualValidatorDirective,
    ManageComponent,
    DisplayBookComponent,
    BookDetailsComponent,
    DialogEditBookComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
//  JwtModule.forRoot({}),
    MaterialModule, 
    AppRoutingModule
  ],
providers: [ AuthService, BooksService, AuthGuard, AdminGuard,CreateBookCanDeactivateGuard, 
      RegisterUserCanDeactivateGuard, NotificationService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  entryComponents: [DialogEditBookComponent, DisplayBookComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
