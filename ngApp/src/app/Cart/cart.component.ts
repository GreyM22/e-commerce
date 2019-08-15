import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { MyCart } from '../states/card-states/cart-store';
import { Store } from '@ngrx/store';
import * as BookCartActions from '../states/card-states/bookCart.action';
import { AuthService } from '../service/auth.service';
import { first } from 'rxjs/operators';
import { CartService } from '../service/cart.service';
import {MatTableModule} from '@angular/material/table';
import { NotificationService } from '../service/notification.service';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  //variable for the books inside the cart
  public books
  displayedColumns: string[] = ['bookImg', 'title', 'price', 'date','remove'];


  constructor(private storeCart: Store<MyCart>,
    private _auth: AuthService,
    private _cartService: CartService,
    private notificationService: NotificationService) {
  }

  ngOnInit() {

    this.storeCart.select('booksCart').subscribe(
      res => {

        //take the response and assign the booksCart property
        //for the compiler
        let obj = Object.assign({ booksCart: [] }, res)

        // we check if the cart is empty and the user logged in
        if ((obj.booksCart.length === 0) && this._auth.loggedIn()) {

          //if user logged in we take his cart from the database
          this._cartService.getCartBook().pipe(first()).subscribe(
            res => {

              console.log("There is an response from getCartBook")
              //if cart empty, then we make the books empty too 
              if ((res.books.length === 0) || (res.books === null) )  {
                this.books = res.booksCart;
              }

              //if cart not empty we update the states
              else {
                this.storeCart.dispatch(new BookCartActions.LoadCartBook(res.books))
              }
            },
            err => console.log(err)
          )

        }

        //if the states has not have the cart empty
        // we update dhe books of the component
        else {
          let obj = Object.assign({ booksCart: [] }, res)
          this.books = obj.booksCart
        }
      },

      err => console.log(err)
    )
  }

  clearCart() {

    //we clear the book in the component 
    this.books = []

    // empty the cart in the database
    this._cartService.updateCart([])
      .pipe(first()).subscribe(
        res => {
          this.storeCart.dispatch(new BookCartActions.RemoveAllBooks())
          this.notificationService.success(':: Cart Cleared')
        },
        err => console.log(err)
      )

    //update the cart in the states


  }

  removeFromCart(index: number, book: Book) {

    //remove the item from the books  
    this.books.splice(index, 1)

    this.notificationService.success(':: Book removed')

    let obj = { booksCart: []}
    obj.booksCart = this.books
    //update the cart in database
    this._cartService.updateCart(obj)
      .pipe(first()).subscribe(
        res => {
          //update the cart in the state 
          this.storeCart.dispatch(new BookCartActions.RemoveBook(book.idCart))

        },
        err => console.log(err)
      )



  }



}
