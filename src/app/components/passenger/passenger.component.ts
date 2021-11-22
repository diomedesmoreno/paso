import { FlightListComponent } from './../flight/flight-list/flight-list.component';
import { Component, OnInit } from '@angular/core';

// import { UserListComponent } from './../FlightListComponent-list/user-list.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

import { PassengerService } from '../../services/passenger/passenger.service';
import { TokenService } from '../../services/token.service';
import { MessengerNotification } from '../../messenger-notification';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit {
  public notification = new MessengerNotification();
  public error = [];
  public accion: string;

  constructor(
    public passengerService: PassengerService,
    public token: TokenService,
    public dialogRef: MatDialogRef<PassengerComponent>,
  ) { }

  ngOnInit(): void {
  }
  onClose(){
    this.passengerService.form.reset();
    this.passengerService.initializeFormGroup();
    // this.UserList.updateTable();
    this.dialogRef.close();
  }
  onSubmit() {
    // !this.form.invalid
    if (this.passengerService.form.valid) {
      if (!this.passengerService.form.get('id').value){
        this.passengerService.insert(this.passengerService.form.value).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error)
        );
        this.onClose();
        this.notification.getDisplayNotification('Cambios realizados con exitos','success');
      }
      else {
        this.passengerService.update(this.passengerService.form.value,this.passengerService.form.get('id').value).subscribe(
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

}
