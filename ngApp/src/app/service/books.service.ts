import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

 
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private _booksUrl = 'http://localhost:3000/api/books';
  private _bookUrl = 'http://localhost:3000/api/book';
  private _specialbooksUrl = 'http://localhost:3000/api/specialbooks';
  private _registerUrlBook = 'http://localhost:3000/api/manage'

  public genres = [
    {id :1, name: "Classic"},
    {id :2, name: "Crime and Detective"},
    {id :3, name: "Drama"},
    {id :4, name: "Horror"},
    {id :5, name: "Romance"},
    {id :6, name: "Non-Ficion"},
    {id :7, name: "Ficion"}
 ]


  

  constructor( private http : HttpClient,
              private  _router: ActivatedRoute,
              ) { }



  


  getGenres(){
    return this.genres
  }
  
  getsBooks(): Observable<any> {

    return this.http.get<any>(this._booksUrl)
  }


  getBook(id:string): Observable<any> {

    return this.http.get<any>(this._bookUrl+'?_id='+id)
  }

  

  getsSpecialBooks(): Observable<any>{
    return this.http.get<any>(this._specialbooksUrl)
  }

  registerBook(book): Observable<any>{

    return this.http.post<any>(this._registerUrlBook, book)
  }

  updateBook(book): Observable<any>{

    return this.http.put<any>(this._booksUrl+'?_id='+book._id, book)
  }

  

  delete(book): Observable<any>{
    return this.http.delete<any>(this._booksUrl+'?_id='+book._id, book)

  }



}
