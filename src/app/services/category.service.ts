import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
public url = environment.apiURL;

constructor(private _http: HttpClient) { }

add(data: any): Observable<any>{
return this._http.post(this.url+'/category/add', data, {
  headers: new HttpHeaders().set('Content-Type','application/json')
})
}

update(data: any): Observable<any>{
return this._http.patch(this.url+'/category/update', data,{
  headers: new HttpHeaders().set('Content-Type','application/json')
})
}


getCategories(){
  console.log(this._http.get(this.url+'/category/get'))
  return this._http.get(this.url+'/category/get')
}





}
