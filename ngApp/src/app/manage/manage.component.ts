import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { BooksService } from '../service/books.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  //objekti i te dhenave te librit, inicializohet perbrenda author dhe genres meqense mund te marrin me shume se nje vlere
  registerBookData = { hide : "true", authors: [], genres: []};

  displayedColumns: string[] = ['title', 'author', 'genres', 'price', 'hideBook'];
  public author:String
  books : MatTableDataSource<any>;
  searchKey: string;

  // percaktojme vlerat e tagut selec
  genres= [
    {id :1, name: "Classic"},
    {id :2, name: "Crime and Detective"},
    {id :3, name: "Drama"},
    {id :4, name: "Horror"},
    {id :5, name: "Romance"},
    {id :6, name: "Non-Ficion"},
    {id :7, name: "Ficion"}
 ]

  public genre:String

// marrim formen e komponentit per tu kontrolluar nga guard canDeactivate()
  @ViewChild('bookForm',{ static: true }) public createBookForm: NgForm;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor( private _auth : AuthService,
                  private _router : Router,
                  private _booksService: BooksService,
                  private dialog: MatDialog,
                  private notificationService: NotificationService
                  ) { }

  ngOnInit() {
    this._booksService.getsBooks()
                      .subscribe(
                        res => {
                          
                          this.books = new MatTableDataSource(res)
                        
                          this.books.sort = this.sort;
                          this.books.paginator = this.paginator;
                          
                        })
  }

  addAuthor(){
    if(this.author.length>=5)
    {
      this.registerBookData.authors.push({id:this.registerBookData.authors.length, author: this.author})
      this.author=''
    }
  }

  addGenre(){
    if(this.genre.length>=0)
    {
      this.registerBookData.genres.push(this.genre)
      this.genre=''
    }
  }

  registerBook(){
  
    console.log(this.registerBookData);
    this._booksService.registerBook(this.registerBookData)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log(err)
      )
      this.createBookForm.reset()
      this.registerBookData.authors = []
      this.registerBookData.genres = []
    this.notificationService.success(":: Submited");
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.books.filter = this.searchKey.trim().toLowerCase();
  }

}
