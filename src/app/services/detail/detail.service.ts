import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormControl, Validators, FormGroup  } from '@angular/forms';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  private baseUrl = environment.base;
  private headers: HttpHeaders; 
  
  public form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    countryFrom: new FormControl('', [Validators.required]),
    countryTo: new FormControl('', [Validators.required]),
    numberPassengers: new FormControl('', [Validators.required]),
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
    this.form.setValue({
      id: null,
      name:"",
      countryFrom:"",
      countryTo:"",
      numberPassengers:"",
    });
  }

  edit(row): void {
    this.form.setValue({
      name: row.name,
      countryFrom: row.countryFrom,
      countryTo: row.countryTo,
      numberPassengers: row.numberPassengers,
      id: row.id
    });
  }

  initializeFormGroup(): void {
    this.form.setValue({
      id: null,
      name: '',
      countryFrom: '',
      countryTo: '',
      numberPassengers: '',
    });
  }

  // Methods Api
  get(request?) {
    // console.log(` SOy : ${this.baseUrl}/users`, request);
    return this.http.get(`${this.baseUrl}/details`, request);
  }

  insert(request) {
    console.log(`${this.baseUrl}/users`, request);
    return this.http.post(`${this.baseUrl}/details`, request);
    // signup(data) {details
      // return this.http.post(`${this.baseUrl}/signup`, request)
    // }
  }

  update(request?,id?) {
    return this.http.put(`${this.baseUrl}/details/${id}`, request);
  }

  delete(id) {
    return this.http.delete(`${this.baseUrl}/details/${id}`, { headers: this.headers });
  }

  show(request?) {
    return this.http.get(`${this.baseUrl}/details`, request);
  }
} 
