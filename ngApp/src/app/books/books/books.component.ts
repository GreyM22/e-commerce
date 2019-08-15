import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../service/books.service';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
  keyframes
} from '@angular/animations';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogEditBookComponent } from '../dialog-edit-book/dialog-edit-book.component';
import { Book } from 'src/app/models/book';
import { ManageComponent } from 'src/app/manage/manage.component';
import { AuthService } from 'src/app/service/auth.service';
import { Store } from '@ngrx/store';
import { MyCart } from 'src/app/states/card-states/cart-store';
import * as BookCartActions from '../../states/card-states/bookCart.action';
import { first } from 'rxjs/operators';
import { NotificationService } from 'src/app/service/notification.service';
import { CartService } from 'src/app/service/cart.service';



@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  animations: [
    trigger('divsAnimation', [
      transition('* => *', [
        query('.example-card', style({ opacity: 0 }), { optional: true }),
        query('.example-card',
          stagger('300ms', [
            animate('1s ease-in', keyframes([
              style({ opacity: 0, transform: 'translateY(-75px)', offset: 0 }),
              style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
              style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
            ]))
          ]))
      ])
    ])
  ],
})
export class BooksComponent implements OnInit {

  //the books that will be receved from the database
  books: Book[];
  //the books that will be filtered by the search filled
  filteredBooks: Book[];
  //the value of the search field
  private _searchKey: string;


  get searchKey(): string {
    return this._searchKey
  }

  set searchKey(value: string) {
    this._searchKey = value
    this.filteredBooks = this.filterBooks(value)
  }

  filterBooks(searchString: string) {
    return this.books
    .filter(book => book.title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 || this.checkAuthor(book.authors, searchString) !== -1 || book.genres.toString().toLowerCase().indexOf(searchString.toLowerCase()) !== -1)
  } 

  //function that check if the searchKey correspond to the author
  checkAuthor(authors:any, searchString: string): number{
    for (let i = 0; i < authors.length; i++){
      if(authors[i].author.toLowerCase().indexOf(searchString) !== -1)
      return 1
    }
    return -1
  }


  constructor(private dialog: MatDialog,
    private _booksService: BooksService,
    private _bookService: BooksService,
    public _authService: AuthService,
    private store: Store<MyCart>,
    private notificationService: NotificationService,
    private _cart: CartService) {
  }

  ngOnInit() {

    //retrive all the books from the database
    this._booksService.getsBooks()
      .subscribe(
        res => {
          this.books = res.reverse(),
            this.filteredBooks = this.books

        },
        err => console.log(err)
      )

  }

  //for the *ngFor in order to not reload all the component if one of
  //them is changed
  trackBookId(index: number, book: any) {
    return book._id
  }

  //open the edit dialog with the book obj inside
  openDialog(book: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data = book;
    this.dialog.open(DialogEditBookComponent, dialogConfig);

  }


  deleteBook(index: number) {

    this._bookService.delete(this.books[index])
      .pipe(first()).subscribe(
        res => {
          //remove the book deleted from the array
          this.books.splice(index, 1)
          this.notificationService.success(":: Deleted");
        },
        err => console.log(err)
      )
  }

  //opens the dialog to insert a new book
  createBook() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    const dialogRef = this.dialog.open(ManageComponent, dialogConfig);
    dialogRef.afterClosed().pipe(first()).subscribe(
      data => {
        if(data) this.books.unshift(data);
      }
    )

  }

  //add a books to the cart
  addCart(book: Book) {
   this.store.dispatch(new BookCartActions.AddBook(book))
    this.store.select('booksCart').pipe(first()).subscribe(
      res => {
        this._cart.updateCart(res)
          .pipe(first()).subscribe(
            res => console.log(res),
            err => console.log(err)
          )
      },

      err => console.log(err)
    )

    this.notificationService.success(':: Added to Cart')


  }


}
