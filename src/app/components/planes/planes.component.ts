import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { TokenService } from 'app/services/token.service';
import { PlanesService } from 'app/services/planes/planes.service';
import { MessengerNotification } from 'app/messenger-notification';
import { TypesPlanesService } from 'app/services/typesPlanes/typesPlanes.service'; 

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {

  private notification = new MessengerNotification();
  public error: string[];
  public tipoAvion: any= [];

  constructor(
    private planesService: PlanesService,
    private modalRef: MatDialogRef<PlanesComponent>,
    private typesPlanesService: TypesPlanesService,
  ) { }

  ngOnInit(): void {
    this.typesPlanesService.get()
    .subscribe(
      data => {
        this.tipoAvion = data['data'];
      },
      error => {
        console.log("Error: ",error);
      }
      );
  }
  onClose(){
    this.planesService.form.reset();
    this.planesService.initialForm();
    this.modalRef.close();
  }

  onSubmit() {
    console.log(this.planesService.form.get('id').value,this.planesService.form.value);
    if (this.planesService.form.valid) {
      if (!this.planesService.form.get('id').value){
        this.planesService.insert(this.planesService.form.value).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error) 
        );
        this.onClose();
        this.notification.getDisplayNotification('Cambios realizados con exitos','success');
      }
      else {
        this.planesService.update(this.planesService.form.value,this.planesService.form.get('id').value).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error)
        );
        this.notification.getDisplayNotification('Cambios realizados con exitos','success');
        this.onClose();
      }
    }
    
  }

  handleResponse(data) {
  }

  handleError(error) {
    this.error = error.error.error;
    if (this.error.length)
      this.notification.getDisplayErrors(this.error);
    else 
      this.notification.getDisplayNotification('Opss.. ocurrio un error con el servidor','danger');
    console.log(this.error);
  }
}
