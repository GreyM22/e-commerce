import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../service/books.service';
import { trigger, 
         transition, 
         query, 
         style,
          stagger, 
          animate, 
          keyframes } from '@angular/animations';

import { FormGroup, FormControl } from '@angular/forms';
import { Book } from 'src/app/models/book';
import { first } from 'rxjs/operators';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card'
import { Store } from '@ngrx/store';
import { MyCart } from 'src/app/states/card-states/cart-store';
import * as BookCartActions from '../../states/card-states/bookCart.action';
import { CartService } from 'src/app/service/cart.service';
import { NotificationService } from 'src/app/service/notification.service';




@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
}) 
export class BookDetailsComponent implements OnInit {

  book:Book;

  constructor(private _router: ActivatedRoute,
              private _booksService : BooksService,
              private store: Store<MyCart>,
              private _cart: CartService,
              private notificationService: NotificationService

              ) { }

  ngOnInit() {
    const id = this._router.snapshot.params['id']
    this._booksService.getBook(id).pipe(first())
                      .subscribe(
                        res => this.book = res,
                        err => console.log(err)
                      )
  }

  addCart(book: Book) {
    this.store.dispatch(new BookCartActions.AddBook(book))
     this.store.select('booksCart').pipe(first()).subscribe(
       res => {
         this._cart.updateCart(res)
           .pipe(first()).subscribe(
             res => console.log(res),
             err => console.log(err)
           )
       },
 
       err => console.log(err)
     )
     this.notificationService.success(':: Added to Cart')
      }
 
    

}
