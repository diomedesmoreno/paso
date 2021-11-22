import { MatDialogRef } from '@angular/material/dialog';
import { TokenService } from 'app/services/token.service';
import { FlightService } from 'app/services/flight/flight.service';
import { Component, OnInit } from '@angular/core';
import { MessengerNotification } from 'app/messenger-notification';


import { ProgressSpinnerMode } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {

  private notification = new MessengerNotification();
  public error: string[];
  selectedFile: File=null;

  constructor(
    private schoolService: FlightService,
    private token: TokenService,
    private modalRef: MatDialogRef<SchoolComponent>
  ) { }

  ngOnInit(): void {
  }

  onClose(){
    this.schoolService.form.reset();
    this.schoolService.initialForm();
    // this.schoolService.imgURL = "";
    // this.schoolService.imagePath = "";
    this.modalRef.close();
  }
  
  onSubmit() {
    if (this.schoolService.form.valid) {
      if (!this.schoolService.form.get('id').value){
        this.schoolService.insert(this.schoolService.form.value).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error)
        );
        this.onClose();
        this.notification.getDisplayNotification('Cambios realizados con exitos','success');
      }
      else {
        // console.log("me actualices despues de todo",this.selectedFile);
        // this.schoolService.onUpload(this.schoolService.selectedFile,this.schoolService.form.get('id').value).subscribe(
        //   data => console.log(data),
        //   error => this.handleError(error)
        // );
        this.schoolService.update(this.schoolService.form.value,this.schoolService.form.get('id').value).subscribe(
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
