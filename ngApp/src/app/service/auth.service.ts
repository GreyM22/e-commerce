import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { Observable } from 'rxjs';
import { Book } from '../models/book';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = 'http://localhost:3000/api/register'
  private _loginUrl = 'http://localhost:3000/api/login'
  private _cartUrl = 'http://localhost:3000/api/cart'
  private _buyUrl = 'http://localhost:3000/api/buy'
  private _myBookUrl = 'http://localhost:3000/api/mybook'




  constructor(private http: HttpClient,
    private _router: Router) { }

  registerUser(user):Observable<any> {

    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user):Observable<any> {

    return this.http.post<any>(this._loginUrl, user)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }



  getToke() {
    if (localStorage.getItem('token'))
      return localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/books'])
  }

  isAuthorized(allowedRoles: string[]): boolean {
    // kontrollon nese 'allowedRoles' eshte boshe, nese eshte atehere lejon perdoruesin te aksesoj faqen
    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }

    // merre token-in nga localStorage
    const token = localStorage.getItem('token');

    //kontrollojme nese tokeni eshte null
    if (token) {
      // decifron token-in per te lexuar te dhenat e payload-id
      const decodeToken = jwt_decode(token);

      // kontrollone nese eshte decifruar me sukses, ne te kundert mohon aksesin
      if (!decodeToken) {
        console.log('Invalid token');
        return false;
      }

      // kontrollone nese roli i perdoruesit eshte nder rolet e lejuara, nese nuk eshte kthen false
      return allowedRoles.includes(decodeToken.role);
    }

    return false;

  }
  getMyBook(): Observable<any> {

    const token = localStorage.getItem('token');
    const decodeToken = jwt_decode(token);

    if (!decodeToken) {
      console.log('Invalid token');
    }
    return this.http.get<any>(this._myBookUrl + '?_id=' + decodeToken.subject)
  }


  buy(books: string[]){
    
    const token = localStorage.getItem('token');
    const decodeToken = jwt_decode(token);

    return this.http.put<any>(this._buyUrl+'?_id='+decodeToken.subject, books)

  }

}
