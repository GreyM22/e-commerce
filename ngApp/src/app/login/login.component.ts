import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import * as BookCartActions from '../states/card-states/bookCart.action'
import { Store } from '@ngrx/store';
import { MyCart } from '../states/card-states/cart-store';
import { first } from 'rxjs/operators';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //the object that will contain the data of the form 
  loginUserData = {}

  //message tha will be desplayed to the user in case of an error
  msg: string;

  constructor(private _auth: AuthService,
    private _router: Router,
    private storeCart: Store<MyCart>,
    private _cartService: CartService) { }

  ngOnInit() {
  }

  loginUser() {
    //we check if there is a user with this data
    this._auth.loginUser(this.loginUserData)
      .pipe(first())
      .subscribe(
        res => {
          localStorage.setItem('token', res.token)

          this._router.navigate(['/books'])
          //if the user has books in the cart, we update dhe cart
          this._cartService.getCartBook().pipe(first()).subscribe(
            res =>
              //update the state of the card
              this.storeCart.dispatch(new BookCartActions.LoadCartBook(res.books))
            ,
            err => this.msg = err.error
          )

        },
        err => this.msg = err.error
      )
  }

}
