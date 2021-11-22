import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormControl, Validators, FormGroup  } from '@angular/forms';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  private baseUrl = environment.base;
  private headers: HttpHeaders; 
  
  public form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    id: new FormControl('', []),
  });
  
  constructor(
    private http: HttpClient,
    
    ) { 
    this.headers = new HttpHeaders({
      "Accept": "application/json",
      "Authorization" : "Baerer",
    });
  }

  // Methods
  onClean(): void {
    // this.form.setValue({
    //   id: null,
    //   fullName:"",
    //   email:"",
    //   gender:"",
    //   birthday:"",
    //   password:"",
    // });
  }

  editPassenger(row): void {
    this.form.setValue({
      name: row.name,
      email: row.email,
      birthday: row.birthday,
      lastname: row.lastname,
      id: row.id
    });
  }

  initializeFormGroup(): void {
    this.form.setValue({
      id: null,
      name: '',
      email: '',
      birthday: '',
      lastname: '',
    });
  }

  // Methods Api
  get(request?) {
    // console.log(` SOy : ${this.baseUrl}/users`, request);
    return this.http.get(`${this.baseUrl}/passengers`, request);
  }

  insert(request) {
    console.log(`${this.baseUrl}/users`, request);
    return this.http.post(`${this.baseUrl}/passengers`, request);
    // signup(data) {
      // return this.http.post(`${this.baseUrl}/signup`, request)
    // }
  }

  update(request?,id?) {
    return this.http.put(`${this.baseUrl}/passengers/${id}`, request);
  }

  delete(id) {
    return this.http.delete(`${this.baseUrl}/passengers/${id}`, { headers: this.headers });
  }

  show(request?) {
    return this.http.get(`${this.baseUrl}/passengers`, request);
  }
} 
