import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private _booksUrl = 'http://localhost:3000/api/books';
  private _specialbooksUrl = 'http://localhost:3000/api/specialbooks';
  constructor( private http : HttpClient) { }

  getsBooks(): Observable<any>{
    return this.http.get<any>(this._booksUrl)
  }

  getsSpecialBooks(){
    return this.http.get<any>(this._specialbooksUrl)
  }
}
