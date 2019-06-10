import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BooksService } from '../../service/books.service';
import { MatDialog, MatDialogConfig,  } from "@angular/material";
import { DialogEditBookComponent } from '../dialog-edit-book/dialog-edit-book.component';


@Component({
  selector: 'app-display-book',
  templateUrl: './display-book.component.html',
  styleUrls: ['./display-book.component.css']
})
export class DisplayBookComponent implements OnInit {


  @Input() book: { authors:[ {id: number, author:string}]};

  authors = " ";

  
  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private dialog: MatDialog,
              private bookService: BooksService) {

                
               }

  ngOnInit() {
    for(let i = 0; i < this.book.authors.length; i++){
      this.authors += this.book.authors[i].author+", ";
    }
  }


  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data = this.book;
    const dialogRef = this.dialog.open(DialogEditBookComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      res => {
        this._router.navigate(['/books']);
      }
      )

  }

  deleteBook(book){
    this.bookService.delete(book)
                    .subscribe(
                      res => console.log(res),
                      err => console.log(err)
                    )
  }


}
