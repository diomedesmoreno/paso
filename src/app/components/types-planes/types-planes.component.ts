import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { TypesPlanesService } from 'app/services/typesPlanes/typesPlanes.service';
import { MessengerNotification } from 'app/messenger-notification';

@Component({
  selector: 'app-types-planes',
  templateUrl: './types-planes.component.html',
  styleUrls: ['./types-planes.component.css']
})
export class TypesPlanesComponent implements OnInit {

  private notification = new MessengerNotification();
  public error: string[];
  
  constructor(
    private typesPlanesService: TypesPlanesService,
    private modalRef: MatDialogRef<TypesPlanesComponent>,
  ) { }

  ngOnInit(): void {
  }

  onClose(){
    this.typesPlanesService.form.reset();
    this.typesPlanesService.initialForm();
    this.modalRef.close();
  }

  onSubmit() {
    console.log(this.typesPlanesService.form.get('id').value,this.typesPlanesService.form.value);
    if (this.typesPlanesService.form.valid) {
      if (!this.typesPlanesService.form.get('id').value){
        this.typesPlanesService.insert(this.typesPlanesService.form.value).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error) 
        );
        this.onClose();
        this.notification.getDisplayNotification('Cambios realizados con exitos','success');
      }
      else {
        this.typesPlanesService.update(this.typesPlanesService.form.value,this.typesPlanesService.form.get('id').value).subscribe(
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
