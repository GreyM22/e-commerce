import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
// import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../models/user';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //the object that will take the value of the form
  registerUserData : User = {
    name: '',
    surname: '',
    birthDate: new Date(),
    email: '',
    password: '',
    confirmPassword:''
  };

  // we take the formGroup in html to check later if its valid
  @ViewChild('rForm', { static: true }) registerForm :any;

  constructor( private _auth : AuthService,
                  private _router : Router,) { }

  ngOnInit() {
  
  }
 
  registerUser(){

    //check if form is valid to send data
    if(this.registerForm.valid){


      this._auth.registerUser(this.registerUserData)
          .pipe(first()).subscribe(
            res => console.log(res),
            err => console.log(err)
          )
      this._router.navigate(['/login'])
      this.registerForm.reset()

    }
  }

}
