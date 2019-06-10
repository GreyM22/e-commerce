import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {};

  @ViewChild('rForm', { static: true }) registerForm :any;

  constructor( private _auth : AuthService,
                  private _router : Router,) { }

  ngOnInit() {
  
  }
 
  registerUser(){
    console.log(this.registerUserData);

    if(this.registerForm.valid){

      this._auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token', res.token)
          this._router.navigate(['/specialbooks'])
          this.registerForm.reset()
        },
        err => console.log(err)
      )
    }
  }

}
