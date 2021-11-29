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
    passengers_id: new FormControl('', [Validators.required]),
    flights_id: new FormControl('', [Validators.required]),
    countries_id: new FormControl('', [Validators.required]),
    salida: new FormControl('', [Validators.required]),
    regreso: new FormControl('', [Validators.required]),
    countries_to: new FormControl('', [Validators.required]),
    countries_from: new FormControl('', [Validators.required]),
    number_passengers: new FormControl('', [Validators.required]),
    id: new FormControl('', []),
  });
  public formP: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    birthday: new FormControl('', []),
    lastname: new FormControl('', [Validators.required]),
    flight_id: new FormControl('', []),
  });
  public formAs: FormGroup = new FormGroup({
    column_row: new FormControl('', [Validators.required]),
    number_row: new FormControl('', [Validators.required]),
    seat_row: new FormControl('', []),
    flight_id: new FormControl('', []),
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
      countries_id:"",
      flights_id:"",
      passengers_id:"",
      salida:"",
      regreso:"",
      countries_to:"",
      countries_from:"",
      number_passengers:"",
    });
  }

  editTicket(row): void {
    this.form.setValue({
      countries_id: row.countries_id,
      flights_id: row.flights_id,
      passengers_id: row.passengers_id,
      // lastname: row.lastname,
      id: row.id
    });
  }
  add(row): void {


    // this.form.setValue({
    //   countries_id: row.countries_id,
    //   flights_id: row.flights_id,
    //   passengers_id: row.passengers_id,
    //   // lastname: row.lastname,
    //   id: row.id
    // });
  }

  initializeFormGroup(): void {
    this.form.setValue({
      id: null,
      countries_id: '',
      flights_id: '',
      passengers_id: '',
      salida:"",
      regreso:"",
      countries_to:"",
      countries_from:"",
      number_passengers:"",
    });
  }

  onCleanP(): void {
    this.formP.setValue({
      flight_id: null,
      name:"",
      email:"",
      // gender:"",
      birthday:"",
      lastname:"",
    });
  }

  initializeFormAs(): void {
    this.formP.setValue({
      flight_id: null,
      column_row: '',
      number_row: '',
      seat_row: '',
    });
  }
  onCleanAs(): void {
    this.formP.setValue({
      flight_id: null,
      column_row: '',
      number_row: '',
      seat_row: '',
    });
  }

  initializeFormP(): void {
    this.formP.setValue({
      flight_id: null,
      name: '',
      email: '',
      birthday: '',
      lastname: '',
    });
  }

  // Methods Api
  get(request?) {
    // console.log(` SOy : ${this.baseUrl}/users`, request);
    return this.http.get(`${this.baseUrl}/tickets`, request);
  }
  

  insertR(request) {
    console.log(`${this.baseUrl}/users`, request);
    return this.http.post(`${this.baseUrl}/tickets-reservation`, request);
    // signup(data) {
      // return this.http.post(`${this.baseUrl}/signup`, request)
    // }
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
