import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { environment } from 'environments/environment';
import { ElementRef } from '@angular/core';
import { Observable }               from 'rxjs';
import { MessengerNotification } from 'app/messenger-notification';

@Injectable({
  providedIn: 'root'
})

export class PlanesService {

  private baseUrl = environment.base;
  // public baseUrlImg = environment.base_img;
  private headers: HttpHeaders; 
  public form: FormGroup = new FormGroup({
    types_planes_id: new FormControl('',[Validators.required]),
    seating: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    id: new FormControl('',[]),
  });
  private fileAttr = 'Choose File';
  selectedFile: File=null; 
  private notification = new MessengerNotification();
  // public imagePath;
  // public imgURL:any;

  constructor(
    private http: HttpClient
  ) { 
    this.headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization" : "Baerer",
    });
  }

  @ViewChild('fileInput') fileInput: ElementRef;

  // Methods
  initialForm(): void{
    this.form.setValue({
      types_planes_id: "",
      seating: "",
      name: "",
      id: null
    });
    // this.imgURL = "";
    // this.imagePath = "";
  }

  setForm(row): void{
    // let img = row.logo_url.length > 0? this.baseUrlImg + row.logo_url : null;
    this.form.setValue({
      name: row.name,
      types_planes_id: row.types_planes_id,
      seating: row.seating,
      id: row.id
    });
    console.log(this.form.value);

    // this.imgURL = img;
  }

  // Api
  get(request?){
    return this.http.get(`${this.baseUrl}/planes`, request /*, {"headers":  this.headers }*/ );
  }
  insert(request){
    return this.http.post(`${this.baseUrl}/planes`, request, { headers: this.headers } );
  }
  update(request,id){
    return this.http.put(`${this.baseUrl}/planes/${id}`, request, { headers: this.headers } );
  }
}
