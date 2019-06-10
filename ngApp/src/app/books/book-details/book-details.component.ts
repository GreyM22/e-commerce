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


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
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
export class BookDetailsComponent implements OnInit {

  book = {};

  constructor(private _router: ActivatedRoute,
              private _booksService : BooksService) { }

  ngOnInit() {
    
    /*const idObject = this._router.snapshot.params['id']


    this._booksService.getsBook(idObject)
                      .subscribe(
                        res => this.book = res,
                        err => console.log(err) 
                      )*/
  }

}
