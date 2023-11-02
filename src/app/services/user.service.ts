import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }
  public url = environment.apiURL; //url = localhost:8080

  signup(data: any): Observable<any>{
  return  this._http.post(this.url+'/user/signup', data, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }




}
