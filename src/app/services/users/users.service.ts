import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormControl, Validators, FormGroup  } from '@angular/forms';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = environment.base;
  private headers: HttpHeaders; 
  public genders = [
    {key:'F', name: 'Female'},
    {key:'M', name: 'Mascule'}
  ];
  public form: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required,Validators.maxLength(100),Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email,Validators.maxLength(100),Validators.minLength(12)]),
    birthday: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
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

  editUser(row): void {
    this.form.setValue({
      fullName: row.name,
      email: row.email,
      birthday: row.birthday,
      gender: row.gender,
      id: row.id
    });
  }

  initializeFormGroup(): void {
    this.form.setValue({
      id: null,
      fullName: '',
      email: '',
      birthday: '',
      gender: '',
    });
  }

  // Methods Api
  allUsers(request?) {
    // console.log(` SOy : ${this.baseUrl}/users`, request);
    return this.http.get(`${this.baseUrl}/users`, request);
  }

  insert(request) {
    console.log(`${this.baseUrl}/users`, request);
    return this.http.post(`${this.baseUrl}/users`, request);
    // signup(data) {
      // return this.http.post(`${this.baseUrl}/signup`, request)
    // }
  }

  update(request?,id?) {
    return this.http.put(`${this.baseUrl}/users/${id}`, request);
  }

  delete(id) {
    return this.http.delete(`${this.baseUrl}/users/${id}`, { headers: this.headers });
  }

  show(request?) {
    return this.http.get(`${this.baseUrl}/users`, request);
  }
} 
