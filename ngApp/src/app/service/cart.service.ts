import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import * as jwt_decode from "jwt-decode";
import { Book } from '../models/book';


@Injectable({
  providedIn: 'root'
})
export class CartService {

    private _cartUrl = 'http://localhost:3000/api/cart'
    private _buyUrl = 'http://localhost:3000/api/buy'



  constructor(private http: HttpClient,
              private _router: Router,
              private _auth: AuthService) { }

  getCartBook(): Observable<any> {

    const token = this._auth.getToke();
    const decodeToken = jwt_decode(token);

    if (!decodeToken) {
      console.log('Invalid token');
    }
    return this.http.get<any>(this._cartUrl + '?_id=' + decodeToken.subject)
  }

  updateCart(booksCart: any){
    
    const token = this._auth.getToke();
    const decodeToken = jwt_decode(token);

    return this.http.put<any>(this._cartUrl+'?_id='+decodeToken.subject, booksCart)

  }


}
