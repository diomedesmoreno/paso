// import { Component, OnInit } from '@angular/core';

// import {FormBuilder, FormGroup, Validators} from '@angular/forms';

// @Component({
//   selector: 'app-flight-reservations',
//   templateUrl: './flight-reservations.component.html',
//   styleUrls: ['./flight-reservations.component.css']
// })
// export class FlightReservationsComponent implements OnInit {
//   isLinear = false;
//   firstFormGroup: FormGroup;
//   secondFormGroup: FormGroup;
//   constructor(
//     private _formBuilder: FormBuilder
//   ) { }

//   ngOnInit(): void {
//     this.firstFormGroup = this._formBuilder.group({
//       // firstCtrl: ['', Validators.required],
//     });
//     this.secondFormGroup = this._formBuilder.group({
//       // secondCtrl: ['', Validators.required],
//     });
//   }

// }

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { TicketService } from '../../services/ticket/ticket.service';
import { CountryService } from './../../services/country/country.service';
import { FlightService } from './../../services/flight/flight.service';
import { MessengerNotification } from '../../messenger-notification';

export interface FieldTable {
  name: string;
  flightDuration: string;
  departuretime: string;
  arrivaltime: string;
  id: number;
}
@Component({
  selector: 'app-flight-reservations',
  templateUrl: './flight-reservations.component.html',
  styleUrls: ['./flight-reservations.component.css']
})
export class FlightReservationsComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public pasajeros: any = [];
  public paisOrigen: any = [];
  public paisDestino: any = [];
  public resultSearch: any = [];
  public send: any = [];
  public displayedColumns: string[] = ['id', 'name', 'flightDuration', 'departuretime', 'arrivaltime'];
  public notification = new MessengerNotification();
  public error = [];

  constructor(
    private _formBuilder: FormBuilder,
    public ticketService: TicketService,
    public countryService: CountryService,
    public flightService: FlightService,
    ) {}

  ngOnInit() {
    this.send = [
      //   {
      //   departuretime: this.ticketService.form.get('salida').value,
      //   arrivaltime: this.ticketService.form.get('regreso').value,
      //   countryFrom: this.ticketService.form.get('countries_from').value,
      //   countryTo: this.ticketService.form.get('countries_to').value
      // }
      {
        departuretime: 4,
        arrivaltime: 5,
        countryFrom: "2021-11-28 19:30:19",
        countryTo: "2021-11-29 19:30:19"
      }
    ];
      this.flightService.get(this.send)
      .subscribe(
        data => {
          this.resultSearch = new MatTableDataSource<FieldTable>(data['data']);
          console.log(this.resultSearch);
        },
        error => {
          console.log("Error: ",error);
        });
      this.countryService.get(this.send)
      .subscribe(
        data => {
          this.paisOrigen =  data['data'];
          this.paisDestino =  data['data'];
        },
        error => {
          console.log("Error: ",error);
        });
      
    // this.firstFormGroup = this._formBuilder.group({
    //   // firstCtrl: ['', Validators.required],
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   // secondCtrl: ['', Validators.required],
    // });
  }
  onClose(){
    this.ticketService.form.reset();
    this.ticketService.initializeFormGroup();
    this.ticketService.initializeFormP();
    // this.UserList.updateTable();
    // this.ticketService.close();
  }
  onSearch(){
    this.send = [
    //   {
    //   departuretime: this.ticketService.form.get('salida').value,
    //   arrivaltime: this.ticketService.form.get('regreso').value,
    //   countryFrom: this.ticketService.form.get('countries_from').value,
    //   countryTo: this.ticketService.form.get('countries_to').value
    // }
    {
      departuretime: 4,
      arrivaltime: 5,
      countryFrom: "2021-11-28 19:30:19",
      countryTo: "2021-11-29 19:30:19"
    }
  ];
    this.flightService.get(this.send)
    .subscribe(
      data => {
        this.resultSearch = data['data'];
      },
      error => {
        console.log("Error: ",error);
      });
    // this.UserList.updateTable();
    // this.ticketService.close();
  }
  add(row){
    this.send = [
      {
        flights_id: row.id,
      }
    ];
    this.ticketService.formP.setValue({
      flight_id: row.id,
      name: '',
      email: '',
      birthday: '',
      lastname: '',
    });
    console.log(this.ticketService.formP.value);
  }
  saveTicket(){
    console.log(this.ticketService.formP.value,this.ticketService.formP.valid);
    if (this.ticketService.formP.valid) {
      // if (!this.ticketService.formP.get('id').value){
        this.ticketService.insertR(this.ticketService.formP.value)
        .subscribe(
          data => this.handleResponse(data),
            error => this.handleError(error)
        );
        // this.onClose();
        // this.notification.getDisplayNotification('Cambios realizados con exitos','success');
      // }
      
    } else {
      this.notification.getDisplayNotification('Por favor, revise todos los campos! ocurrio un error al validar la información','danger');
    }
      
  }
  handleResponse(data) {
    this.notification.getDisplayNotification('Reservacion realizada con exitos','success');
    this.ticketService.onCleanP();
  }

  handleError(error) {
    this.error = error.error.error;
    if (this.error.length)
      this.notification.getDisplayErrors(this.error);
    else 
      this.notification.getDisplayNotification('Opss.. ocurrio un error con el servidor','danger');
    console.log(this.error);
    this.ticketService.onCleanP();
  }


}
