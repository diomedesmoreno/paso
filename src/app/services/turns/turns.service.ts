import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TurnsService {

  private baseUrl = environment.base;
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) { 
    this.headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization" : "Baerer",
    });
   }

  //  Methods Api
  allDatas(request?){
    return this.http.get(`${this.baseUrl}/turns`,request);
  }

  insert(request){
    return this.http.post(`${this.baseUrl}/turns`,request, { headers: this.headers });
  }

  update(request,id){
    return this.http.put(`${this.baseUrl}/turns/${id}`,request, { headers: this.headers });
  }

  delete(id){
    return this.http.delete(`${this.baseUrl}/turns/${id}`, { headers: this.headers });
  }

  show(request,id){
    return this.http.get(`${this.baseUrl}/turns/${id}`,request);
  }
}
