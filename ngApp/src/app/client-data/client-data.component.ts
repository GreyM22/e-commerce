import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from '../service/client-service.service';
import {MatTableModule} from '@angular/material/table';
import { first } from 'rxjs/operators';
import { NotificationService } from '../service/notification.service';


@Component({
  selector: 'app-client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.css']
})
export class ClientDataComponent implements OnInit {

  clients:[]

  displayedColumns: string[] = ['name', 'surname', 'email', 'nr_purchase'];


  constructor(     private _clientService: ClientServiceService,
     private _notificationService: NotificationService     ) { }

  ngOnInit() {

        //retrive all the clients from the database
        this._clientService.getsClients()
        .subscribe(
          res => {
            this.clients = res.reverse()  
          },
          err => console.log(err)
        )

        
  }

  blockClient(client) {
    client.block = true

    this._clientService.updateClient(client)
    .pipe(first()).subscribe(
      res =>   this._notificationService.success(":: succeed"),
      err => console.log(err),
     )
  


  }

}
