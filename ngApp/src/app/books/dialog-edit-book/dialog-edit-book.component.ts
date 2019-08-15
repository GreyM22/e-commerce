import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { BooksService } from '../../service/books.service';
import { NotificationService } from '../../service/notification.service';
import { Book } from 'src/app/models/book';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-edit-book',
  templateUrl: './dialog-edit-book.component.html',
  styleUrls: ['./dialog-edit-book.component.css']
})
export class DialogEditBookComponent implements OnInit {

  //the form of the templet to check if its valid
  @ViewChild('rForm', { static: true }) editBookForm: any;


  //the book that will be edited
  public book: Book;
  //the variable to store the data of the genres
  public genresData: any

  constructor(
    public dialogRef: MatDialogRef<DialogEditBookComponent>,
    private _booksService: BooksService,
    private _notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) book: any
  ) {
    
    if(book!==null){this.book = book}
    
  }

  ngOnInit() {
    
    this.genresData = this._booksService.getGenres()


  }

  //change the value of the author if it is change in the form 
  onChangeAuthor(event: any, index: number){
    this.book.authors[index] = event.target.value
  }

 

  editBook() {

    if (this.editBookForm.valid) {

        this._booksService.updateBook(this.book)
        .pipe(first()).subscribe(
          res => console.log(res),
          err => console.log(err),
         )
      
      this._notificationService.success(":: Submited");
      this.dialogRef.close();
    }

  }

  onClose() {
    this.dialogRef.close();
  }

  //for the *ngFor to reload only the changed author
  trackAuthorById(index:number, author:any){
    return author.id
  }


}
