import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { TokenService } from 'app/services/token.service';
import { FlightService } from 'app/services/flight/flight.service';
import { MessengerNotification } from 'app/messenger-notification';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  private notification = new MessengerNotification();
  public error: string[];
  public paisOrigen: any= [];

  constructor(
    private flightService: FlightService,
    private token: TokenService,
    private modalRef: MatDialogRef<FlightComponent>
  ) { }

  ngOnInit(): void {
    
  }
  onClose(){
    this.flightService.form.reset();
    this.flightService.initialForm();
    // this.flightService.imgURL = "";
    // this.flightService.imagePath = "";
    this.modalRef.close();
  }

  onSubmit() {
    if (this.flightService.form.valid) {
      if (!this.flightService.form.get('id').value){
        this.flightService.insert(this.flightService.form.value).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error) 
        );
        this.onClose();
        this.notification.getDisplayNotification('Cambios realizados con exitos','success');
      }
      else {
        // console.log("me actualices despues de todo",this.selectedFile);
        // this.flightService.onUpload(this.flightService.selectedFile,this.flightService.form.get('id').value).subscribe(
        //   data => console.log(data),
        //   error => this.handleError(error)
        // );
        this.flightService.update(this.flightService.form.value,this.flightService.form.get('id').value).subscribe(
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
