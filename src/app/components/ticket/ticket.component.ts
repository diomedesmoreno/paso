import { CountryService } from './../../services/country/country.service';
import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

import { TicketService } from '../../services/ticket/ticket.service';
import { FlightService } from '../../services/flight/flight.service';
import { PassengerService } from '../../services/passenger/passenger.service';

import { TokenService } from '../../services/token.service';
import { MessengerNotification } from '../../messenger-notification';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  public notification = new MessengerNotification();
  public error = [];
  public accion: string;

  public pasajeros: any = [];
  public paisDestino: any = [];
  public vuelos = [];
  // public plans                    : Plan[] = [];
  // 'Vuelo PAYAIR RD-USA'
  public label_salida: string;
  public label_llegada: string;
  public label_vuelo: string;
  
  constructor(
    public ticketService: TicketService,
    public flightService: FlightService,
    public countryService: CountryService,
    public passengerService: PassengerService,
    public token: TokenService,
    // public dialogRef: MatDialogRef<UserComponent>,
  ) { }

  ngOnInit(): void {
    this.countryService.get()
    .subscribe(
      data => {
        this.paisDestino = data['data'];
      },
      error => {
        console.log("Error: ",error);
      });

    this.passengerService.get()
    .subscribe(
      data => {
        this.pasajeros = data['data'];
      },
      error => {
        console.log("Error: ",error);
      });

    this.flightService.get()
    .subscribe(
      data => {
        this.vuelos = data['data'];
      },
      error => {
        console.log("Error: ",error);
      });
  }

  onClose(){
    this.ticketService.form.reset();
    this.ticketService.initializeFormGroup();
    // this.UserList.updateTable();
    // this.ticketService.close();
  }

  onSubmit() {
    // !this.form.invalid
    if (this.ticketService.form.valid) {
      if (!this.ticketService.form.get('id').value){
        this.ticketService.insert(this.ticketService.form.value).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error)
        );
        this.onClose();
        this.notification.getDisplayNotification('Cambios realizados con exitos','success');
      }
      else {
        this.ticketService.update(this.ticketService.form.value,this.ticketService.form.get('id').value).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error)
        );
        // this.usersService.form.reset();
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

  onSelect(data,value){
      data.forEach(element => {
        if(element.id == value.value ){
            this.label_salida = element.departuretime;
            this.label_llegada = element.arrivaltime;
            this.label_vuelo = element.hour;
        }
        
      });
  }

}
