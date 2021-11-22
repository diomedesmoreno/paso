import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormControl, Validators, FormGroup  } from '@angular/forms';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl = environment.base;
  private headers: HttpHeaders; 
  
  public form: FormGroup = new FormGroup({
    passenger: new FormControl('', [Validators.required]),
    flight: new FormControl('', [Validators.required]),
    countryTo: new FormControl('', [Validators.required]),
    // lastname: new FormControl('', [Validators.required]),
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
      countryTo:"",
      flight:"",
      passenger:"",
      // birthday:"",
      // password:"",
    });
  }

  editPassenger(row): void {
    this.form.setValue({
      countryTo: row.countryTo,
      flight: row.flight,
      passenger: row.passenger,
      // lastname: row.lastname,
      id: row.id
    });
  }

  initializeFormGroup(): void {
    this.form.setValue({
      id: null,
      countryTo: '',
      flight: '',
      passenger: '',
      // lastname: '',
    });
  }

  // Methods Api
  get(request?) {
    // console.log(` SOy : ${this.baseUrl}/users`, request);
    return this.http.get(`${this.baseUrl}/tickets`, request);
  }

  insert(request) {
    console.log(`${this.baseUrl}/users`, request);
    return this.http.post(`${this.baseUrl}/tickets`, request);
    // signup(data) {
      // return this.http.post(`${this.baseUrl}/signup`, request)
    // }
  }

  update(request?,id?) {
    return this.http.put(`${this.baseUrl}/tickets/${id}`, request);
  }

  delete(id) {
    return this.http.delete(`${this.baseUrl}/tickets/${id}`, { headers: this.headers });
  }

  show(request?) {
    return this.http.get(`${this.baseUrl}/tickets`, request);
  }
} 
