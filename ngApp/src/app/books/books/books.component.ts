import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../service/books.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';

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
import {  MatDialog } from '@angular/material';

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

  books = [];
  filteredBooks= [];
  private _searchKey: string;


  get searchKey(): string{
    return this._searchKey
  }

  set  searchKey( value: string) {
    this._searchKey = value
    this.filteredBooks = this.filterBooks(value)
  }

  filterBooks(searchString: string){
    return this.books.filter( book => book.title.toLowerCase().indexOf(searchString.toLowerCase() ) !== -1 || book.authors.toString().toLowerCase().indexOf(searchString.toLowerCase() ) !== -1|| book.genres.toString().toLowerCase().indexOf(searchString.toLowerCase() ) !== -1)
  }

  constructor( private dialog: MatDialog,
    private _booksService : BooksService,
                private _router: Router,
                private _route: ActivatedRoute) { 
                }

  ngOnInit() {
        
    this._booksService.getsBooks()
                      .subscribe(
                        res => {
                          this.books = res
                          this.filteredBooks = this.books
                        },
                        err => console.log(err)
                      )
  }

  trackBookId(index:number, book:any){
    return book._id
  }

  
}
