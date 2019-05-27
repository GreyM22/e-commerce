import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  registerBookData = {};

  constructor( private _auth : AuthService,
                  private _router : Router) { }

  ngOnInit() {
  }

  registerBook(){
    this._auth.registerBook(this.registerBookData)
      .subscribe(
        res => {
          console.log(res)
          this._router.navigate(['/books'])
        },
        err => console.log(err)
      )
  }

}
