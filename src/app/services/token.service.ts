import { Injectable } from '@angular/core';
import { replaceAll } from 'chartist';
import { environment } from 'environments/environment';

@Injectable()
export class TokenService {
  private iss = {
    login: environment.base_auth + '/login',
    signup: environment.base_auth + '/signup'
  };

  // private iss = {
  //   login: 'http://localhost:8000/api/login',
  //   signup: 'http://localhost:8000/api/signup'
  // };

  constructor() { }

  handle(token) {
    this.set(token);
  }

  set(token) {
    localStorage.setItem('token', token);
  }
  get() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
  }

  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      let sustituto = payload.iss.replaceAll('http','https');
      if (payload) {
        console.log("Soy ",this.iss.login);
        if (this.iss.login.indexOf('airpay-inf') != -1){
          return Object.values(this.iss).indexOf(sustituto) > -1 ? true : false;
        } else {
          return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
        }
      }
    }
    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    console.log(payload);
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }
}
