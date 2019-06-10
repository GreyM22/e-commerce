import { Component, OnInit } from '@angular/core';
import { BooksService } from '../service/books.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-specialbooks',
  templateUrl: './specialbooks.component.html',
  styleUrls: ['./specialbooks.component.css']
})
export class SpecialbooksComponent implements OnInit {

  specialBooks = []

  constructor( private _booksService : BooksService,
        private _router : Router) { }

  ngOnInit() {
    this._booksService.getsSpecialBooks()
     .subscribe(
       res => this.specialBooks=res,
       err => {
         if(err instanceof HttpErrorResponse){
           if(err.status === 401){
             this._router.navigate(['/login'])
           }
         }
       }
     )
  }

}
