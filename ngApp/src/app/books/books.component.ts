import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  animations: [
    trigger('divsAnimation', [
      transition('* => *', [
        query('.card',style({opacity: 0}), {optional:true}),
        query('.card',
          stagger('300ms', [
            animate('1s ease-in', keyframes([
              style({ opacity:0 ,transform: 'translateY(-75px)', offset: 0}),
              style({ opacity:.5,transform: 'translateY(35px)', offset: 0.3}),
              style({ opacity: 1 ,transform: 'translateY(0)', offset: 1})
            ]))
        ]))
      ])
    ])
  ],
})
export class BooksComponent implements OnInit {

  books = []
  constructor( private _booksService : BooksService) { }

  ngOnInit() {
    this._booksService.getsBooks()
     .subscribe( 
       res => this.books= res,
       err => console.log(err)
     )
  }

}
