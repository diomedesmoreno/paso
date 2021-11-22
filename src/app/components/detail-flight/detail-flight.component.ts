import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

import { DetailService } from '../../services/detail/detail.service';
import { TokenService } from '../../services/token.service';
import { MessengerNotification } from '../../messenger-notification';

@Component({
  selector: 'app-detail-flight',
  templateUrl: './detail-flight.component.html',
  styleUrls: ['./detail-flight.component.css']
})
export class DetailFlightComponent implements OnInit {
  public notification = new MessengerNotification();
  public error = [];
  public accion: string;
  private displayColumns: string[]; 

  typesOfShoes: any = [
    {'name':'Boots','lastname': 'UNO'}, 
    {'name':'Clogs','lastname': 'DOS'}, 
    {'name':'Loafers','lastname': 'TRES'}, 
    {'name':'Moccasins','lastname': 'CUATRO'}, 
    {'name':'Sneaker','lastname': 'CINCO'}
  ];

  constructor(
    public detailService: DetailService,
    public token: TokenService,
    public dialogRef: MatDialogRef<DetailFlightComponent>,
  ) {
    this.displayColumns = ['id', 'name','options'];
   }

  ngOnInit(): void {
  }

  onClose(){
    this.detailService.form.reset();
    this.detailService.initializeFormGroup();
    // this.UserList.updateTable();
    this.dialogRef.close();
  }

  onSubmit() {
    // !this.form.invalid
    if (this.detailService.form.valid) {
      if (!this.detailService.form.get('id').value){
        this.detailService.insert(this.detailService.form.value).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error)
        );
        this.onClose();
        this.notification.getDisplayNotification('Cambios realizados con exitos','success');
      }
      else {
        this.detailService.update(this.detailService.form.value,this.detailService.form.get('id').value).subscribe(
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
