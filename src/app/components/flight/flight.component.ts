import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { TokenService } from 'app/services/token.service';
import { FlightService } from 'app/services/flight/flight.service';
import { MessengerNotification } from 'app/messenger-notification';
import { CountryService } from 'app/services/country/country.service';
import { PlanesService } from 'app/services/planes/planes.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  private notification = new MessengerNotification();
  public error: string[];
  public paisOrigen: any= [];
  public paisDestino: any= [];
  public aviones: any= [];

  constructor(
    private flightService: FlightService,
    private planesService: PlanesService,
    private modalRef: MatDialogRef<FlightComponent>,
    private countryServices: CountryService,
  ) { }

  ngOnInit(): void {
    this.countryServices.get()
    .subscribe(
      data => {
        // console.log("0",data['data']);
        this.paisOrigen = data['data'];
        this.paisDestino = data['data'];
        // this.handleResponse(data['data']);
      },
      error => {
        console.log("Error: ",error);
      }
      );
    this.planesService.get()
    .subscribe(
      data => {
        this.aviones = data['data'];
      },
      error => {
        console.log("Error: ",error);
      }
      );
  }
  onClose(){
    this.flightService.form.reset();
    this.flightService.initialForm();
    // this.flightService.imgURL = "";
    // this.flightService.imagePath = "";
    this.modalRef.close();
  }

  onSubmit() {
    console.log(this.flightService.form.get('id').value,this.flightService.form.value);
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
