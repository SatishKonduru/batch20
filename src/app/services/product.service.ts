import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
public URL = environment.apiURL;
  constructor(private _http: HttpClient) { }

add(data: any):Observable<any>{
return  this._http.post(this.URL+'/product/add', data, {
    headers: new HttpHeaders().set('Content-Type','application/json')
  })
}

update(data:any) : Observable<any>{
return  this._http.patch(this.URL+'/product/update', data,{
    headers: new HttpHeaders().set('Content-Type','application/json')
  })
}

getProducts(){
  return this._http.get(this.URL+'/product/get')
}

updateStatus(data: any){
return  this._http.patch(this.URL+'/product/updateStatus', data, {
    headers: new HttpHeaders().set('Content-Type','application/json')
  })
}


delete(id: any){
return this._http.delete(this.URL+'/product/delete/'+id, {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
})
}


getProductByCategory(id: any){
return  this._http.get(this.URL+'/product/getByCategory/'+id, {
    headers: new HttpHeaders().set('Content-Type','application/json')
  })
}


getById(id: any){
return this._http.get(this.URL+'/product/getById/'+id,{
  headers: new HttpHeaders().set('Content-Type','application/json')
})
}



}
