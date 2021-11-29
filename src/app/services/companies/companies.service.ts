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

export class CompaniesService {

  private baseUrl = environment.base;
  // public baseUrlImg = environment.base_img;
  private headers: HttpHeaders; 
  public form: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
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
      name: "",
      description: "",
      id: null
    });
    // this.imgURL = "";
    // this.imagePath = "";
  }

  setForm(row): void{
    // let img = row.logo_url.length > 0? this.baseUrlImg + row.logo_url : null;
    this.form.setValue({
      name: row.name,
      description: row.description,
      id: row.id
    });
    console.log(this.form.value);

    // this.imgURL = img;
  }

  // cargarImagen(event){
  //   let mimeType = event.target.files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     this.notification.getDisplayNotification('Opss.. Este archivo no es permitido','danger');
  //     return;
  //   }
  //   // this.form.controls['logo_url'].setValue(null);
  //   // this.imgURL = event.target.files[0].name;

  //   var reader = new FileReader();
  //   this.imagePath = event.target.files;
  //   reader.readAsDataURL(event.target.files[0]); 
  //   reader.onload = (_event) => { 
  //     this.imgURL = reader.result; 
  //   }

  //   this.form.controls['logo_url'].setValue(this.imgURL);
  //   this.selectedFile=<File>event.target.files[0];
    
  // }
  
  // onUpload(file,id):Observable<any>{
  //   const fd= new FormData;
  //   fd.append('image',file,file.name);
  //   fd.append('id',id);
  //   return   this.http.post('http://localhost:8000/api/file',fd); 
  // }

  // Api
  get(request?){
    return this.http.get(`${this.baseUrl}/companies`, request /*, {"headers":  this.headers }*/ );
  }
  insert(request){
    return this.http.post(`${this.baseUrl}/companies`, request, { headers: this.headers } );
  }
  update(request,id){
    return this.http.put(`${this.baseUrl}/companies/${id}`, request, { headers: this.headers } );
  }
}
