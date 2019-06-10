import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { BooksService } from '../../service/books.service';
import { NotificationService } from '../../service/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-edit-book',
  templateUrl: './dialog-edit-book.component.html',
  styleUrls: ['./dialog-edit-book.component.css']
})
export class DialogEditBookComponent implements OnInit {

  @ViewChild('rForm', { static: true }) editBookForm: any;

  genresData = [
    { id: 1, name: "Classic" },
    { id: 2, name: "Crime and Detective" },
    { id: 3, name: "Drama" },
    { id: 4, name: "Horror" },
    { id: 5, name: "Romance" },
  ]

  public book = { authors: [] }

  constructor(
    public dialogRef: MatDialogRef<DialogEditBookComponent>,
    private booksService: BooksService,
    private notificationService: NotificationService,
    private _router: Router ,
    @Inject(MAT_DIALOG_DATA) book: any
  ) {
    this.book = book
    
  }

  ngOnInit() {

  }

  onChangeAuthor(event: any, index: number){
    this.book.authors[index] = event.target.value
  }

 

  editBook() {

    if (this.editBookForm.valid) {
      this.booksService.updateBook(this.book)
        .subscribe(
          res => console.log(res),
          err => console.log(err),
        )
      this.notificationService.success(":: Submited");
      this.dialogRef.close();
      this._router.navigate(['/books'])
    }

  }

  onClose() {
    this.dialogRef.close();
  }

  onClear() {
    this.editBookForm.reset()
    this.book = {authors: []}

  }

  trackAuthorById(index:number, author:any){
    return author.id
  }


}
