import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MyCart } from '../states/card-states/cart-store';
import { AuthService } from '../service/auth.service';
import { first } from 'rxjs/operators';
import { Book } from '../models/book';
import * as BookCartActions from '../states/card-states/bookCart.action';
import { CartService } from '../service/cart.service';
import { Route, Router } from '@angular/router';



@Component({
  selector: 'app-buy-book',
  templateUrl: './buy-book.component.html',
  styleUrls: ['./buy-book.component.css']
})
export class BuyBookComponent implements OnInit {

  booksToBuy: Book[]
  authors: string[]

  authors2: string[]

  totalPrice = 0
  booksId = []

  displayedColumns: string[] = ['title', 'author', 'price'];

  constructor(private _cartService: CartService,
              private storeCart: Store<MyCart>,
              private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {

    this._cartService.getCartBook().subscribe(
      res => {
        this.booksToBuy = res.books;
        for (let i = 0; i < this.booksToBuy.length; i++) {
          this.totalPrice = this.totalPrice + this.booksToBuy[i].price
        }
      },
      err => console.log(err)
    )



  }


  buyBook() {

    

    for (let i = 0; i < this.booksToBuy.length; i++) {
      this.booksId.push(this.booksToBuy[i]._id)
    }

    this._auth.getMyBook().pipe(first()).subscribe(
      res => {
        let myBook = res.concat(this.booksId)
        this._auth.buy(myBook)
          .pipe(first())
          .subscribe(
            res => {
              this._cartService.updateCart([])
                .pipe(first()).subscribe(
                  res =>{this.storeCart.dispatch(new BookCartActions.RemoveAllBooks())
                  this._router.navigate(['/mybooks'])
                  }

                ,
                  err => console.log(err)
                )

            },
            err => console.log(err)
          )

      },
      err => console.log(err)
    )



  }

}
