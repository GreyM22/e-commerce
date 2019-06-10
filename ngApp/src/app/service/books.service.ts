import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import * as _ from 'lodash';

 
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private _booksUrl = 'http://localhost:3000/api/books';
  private _bookUrl = 'http://localhost:3000/api/books/:id';
  private _specialbooksUrl = 'http://localhost:3000/api/specialbooks';
  private _registerUrlBook = 'http://localhost:3000/api/manage'

  

  form = new FormGroup({
    _id: new FormControl(null),
    title: new FormControl('', [Validators.required,  Validators.minLength(3)]),
    authors: new FormControl('', Validators.required),
    //authors: new FormArray([]),
    description: new FormControl('', [Validators.required, Validators.minLength(50)]),
    genres:  new FormControl('', Validators.required),
    //genres:new FormArray([]),
    price: new FormControl('', Validators.required),
    hide: new FormControl(true),
    hideBook: new FormControl(false)
    
  }); 

  constructor( private http : HttpClient,
              private  _router: ActivatedRoute,
              ) { }


  initializeFormGroup() {
    this.form.setValue({
      _id: null,
      title:'',
      authors: [],
      description: '',
      genres: [],
      price: 0,
      hide: true,
      hideBook: false
    });
  }

  

  getsBooks(): Observable<any> {

    return this.http.get<any>(this._booksUrl)
  }

  

  getsSpecialBooks(): Observable<any>{
    return this.http.get<any>(this._specialbooksUrl)
  }

  registerBook(book){

    return this.http.post<any>(this._registerUrlBook, book)
  }

  updateBook(book): Observable<void>{

    return this.http.put<any>(this._booksUrl+'?_id='+book._id, book)
  }

  populateForm(book){
    this.form.setValue(_.omit(book,'__v'))
  }

  delete(book){
    return this.http.delete<any>(this._booksUrl+'?_id='+book._id, book)

  }


}
