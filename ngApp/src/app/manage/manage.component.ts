import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { BooksService } from '../service/books.service';
import { NotificationService } from '../service/notification.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  //the object to retreve data from the form
  registerBookData = { authors: [], genres: [], hideBook: false }

  //variable for the single author
  public author = ''

  public genresData: any
  //variable for the single genre
  public genre: string

  // we take the form in order to reset it later
  @ViewChild('bookForm', { static: true }) public createBookForm: NgForm;

  constructor(
    private _booksService: BooksService,
    public dialogRef: MatDialogRef<ManageComponent>,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {

    this.genresData = this._booksService.getGenres()
  }

  //add one author to the array of authors in the book
  addAuthor() {
    if (this.author.length >= 5) {
      this.registerBookData.authors.push({ id: this.registerBookData.authors.length, author: this.author })
      this.author = ''
    }
  }

  //add one genre to the array of genres in the book
  addGenre() {
    if (this.genre.length >= 0) {
      this.registerBookData.genres.push(this.genre)
      this.genre = ''
    }
  }

  registerBook() {

    this._booksService.registerBook(this.registerBookData)
                      .pipe(first())
                      .subscribe(
                        res => {
                          console.log(res)
                        },
                        err => console.log(err)
                      )
                      
    this.notificationService.success(":: Submited");
    this.dialogRef.close(this.registerBookData)

  }


  onClose() {
    this.dialogRef.close();
  }

  onReset() {
    this.createBookForm.reset()
    this.registerBookData.authors = []
    this.registerBookData.genres = []
  }

  //set the value of the hidenBook properity
  setHide(flag: boolean) {
    this.registerBookData.hideBook = flag
  }



}
