import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { AuthService } from '../service/auth.service';
import { first } from 'rxjs/internal/operators/first';
import { BooksService } from '../service/books.service';
import {MatTableModule} from '@angular/material/table';
import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';


@Component({
  selector: 'app-mybook',
  templateUrl: './mybook.component.html',
  styleUrls: ['./mybook.component.css'],
  animations: [
    trigger('divsAnimation', [
      transition('* => *', [
        query('.example-card', style({ opacity: 0 }), { optional: true }),
        query('.example-card',
          stagger('300ms', [
            animate('1s ease-in', keyframes([
              style({ opacity: 0, transform: 'translateY(-75px)', offset: 0 }),
              style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
              style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
            ]))
          ]))
      ])
    ])
  ],

})
export class MybookComponent implements OnInit {

  myBooks: Book[] = []
  public bookList
  displayedColumns: string[] = ['bookImg', 'title', 'author','price'];


  constructor(private _auth : AuthService,
              private _book: BooksService) { }

  ngOnInit() {
    this._auth.getMyBook().pipe(first())
              .subscribe(
                res =>{
                  for(let i = 0; i<res.length; i++)
                  {
                    this._book.getBook(res[i]).pipe(first())
                              .subscribe(
                                res2 => this.myBooks.push(res2),
                                err => console.log(err)
                              )
                  }
                  //this.bookList = this.myBooks
                },
                err => console.log(err)
              )
  }

//   async getBooks(){
//     let listOfBooks = await this._auth.getMyBook().pipe(first()).toPromise()
//     listOfBooks.then( 
//       data => {
//         for(let i = 0; i<data.length; i++)
//         {
//           this.getBook(data[i])
//         }
//       }
//     )
//   }

//   async getBook(id:string){
//     let book = await this._book.getBook(id).pipe(first()).toPromise();
//     this.myBooks.push(book)
//   }

}
