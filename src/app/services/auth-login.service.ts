import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class AuthLoginService {
  private baseUrl = environment.base;
  private baseUrl_auth = environment.base_auth;
  private headers: HttpHeaders; 

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization" : "Baerer",
    });
  }

  signup(data) {
    return this.http.post(`${this.baseUrl_auth}/signup`, data)
  }

  login(data) {
    return this.http.post(`${this.baseUrl_auth}/login`, data)
  }

  logout(data) {
    return this.http.post(`${this.baseUrl}/logout`, data)
  }

  refreshToken(data) {
    return this.http.post(`${this.baseUrl_auth}/refreshToken`, data)
  }

  getMyData(data) {
    return this.http.post(`${this.baseUrl_auth}/getMyData`, data)
  }

  update(data,id) {
    return this.http.post(`${this.baseUrl_auth}/getMyData/{id}`, data)
  }

  changePasswordIn(data) {
    return this.http.post(`${this.baseUrl_auth}/changePassword`, data)
  }

  sendEmailLink(data) {
    return this.http.post(`${this.baseUrl_auth}/sendEmail`, data)
  }
  
  changePasswordEx(data) {
    return this.http.post(`${this.baseUrl_auth}/resetPassword`, data)
  }

}
