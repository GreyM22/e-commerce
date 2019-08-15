import { Component } from '@angular/core';
import { AuthService} from './service/auth.service';
import { Store } from '@ngrx/store';
import { UserData } from './states/user-state/user-store';
import * as BookCartActions from '../app/states/card-states/bookCart.action'
import { MyCart } from './states/card-states/cart-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BookStore';
  search:string
  
  constructor( private _authService : AuthService,
    private storeCart: Store<MyCart>,
    ){}

    logOut(){
      this._authService.logoutUser()
      this.storeCart.dispatch(new BookCartActions.RemoveAllBooks())
    }
}
