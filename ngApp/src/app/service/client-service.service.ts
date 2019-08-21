import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  private _clientUrl = 'http://localhost:3000/api/clients';


  constructor(
    private http : HttpClient,
              private  _router: ActivatedRoute,
  ) { }

  getsClients(): Observable<any> {

    return this.http.get<any>(this._clientUrl)
  }

  updateClient(client): Observable<any>{

    return this.http.put<any>(this._clientUrl+'?_id='+client._id, client)
  }


}
