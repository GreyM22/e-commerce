import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
//import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService { 

  private _registerUrl = 'http://localhost:3000/api/register'
  private _loginUrl = 'http://localhost:3000/api/login'

  constructor( private http : HttpClient,
          private _router : Router,
        /* private jwtHelperService: JwtHelperService*/ ) { }
  
  registerUser(user){

    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user){

    return this.http.post<any>(this._loginUrl, user)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  

  getToke(){
    if(localStorage.getItem('token')) 
    return localStorage.getItem('token')
  }

  logoutUser(){
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
      if(token){
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

}
