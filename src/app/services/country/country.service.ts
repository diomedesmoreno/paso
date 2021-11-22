import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormControl, Validators, FormGroup  } from '@angular/forms';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
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

 
  // Methods Api
  get(request?) {
    // console.log(` SOy : ${this.baseUrl}/users`, request);
    return this.http.get(`${this.baseUrl}/countries`, request);
  }
} 
