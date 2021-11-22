import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

import { TicketService } from '../../services/ticket/ticket.service';
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

  public pasajeros: any = [{value:1,name: 'Juan Alexander'}];
  public paisDestino: any = [{value:1, name: 'Estados unidos'}];
  public vuelo: any = [{value: 1, name: 'Vuelo AIR RD-USA'}];
  
  constructor(
    public ticketService: TicketService,
    public token: TokenService,
    // public dialogRef: MatDialogRef<UserComponent>,
  ) { }

  ngOnInit(): void {
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

}
