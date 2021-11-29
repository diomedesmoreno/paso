import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { AirportsService } from 'app/services/airports/airports.service';
import { MessengerNotification } from 'app/messenger-notification';
import { CountryService } from 'app/services/country/country.service';

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.css']
})
export class AirportsComponent implements OnInit {
  private notification = new MessengerNotification();
  public error: string[];
  public paisOrigen: any= [];
  
  constructor(
    private airportsService: AirportsService,
    private modalRef: MatDialogRef<AirportsComponent>,
    private countryServices: CountryService,
  ) { }

  ngOnInit(): void {
    this.countryServices.get()
    .subscribe(
      data => {
        this.paisOrigen = data['data'];
      },
      error => {
        console.log("Error: ",error);
      });
  }

  onClose(){
    this.airportsService.form.reset();
    this.airportsService.initialForm();
    this.modalRef.close();
  }

  onSubmit() {
    console.log(this.airportsService.form.get('id').value,this.airportsService.form.value);
    if (this.airportsService.form.valid) {
      if (!this.airportsService.form.get('id').value){
        this.airportsService.insert(this.airportsService.form.value).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error) 
        );
        this.onClose();
        this.notification.getDisplayNotification('Cambios realizados con exitos','success');
      }
      else {
        this.airportsService.update(this.airportsService.form.value,this.airportsService.form.get('id').value).subscribe(
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
