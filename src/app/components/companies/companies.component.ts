import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { CompaniesService } from 'app/services/companies/companies.service';
import { MessengerNotification } from 'app/messenger-notification';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  private notification = new MessengerNotification();
  public error: string[];
  
  constructor(
    private companiesService: CompaniesService,
    private modalRef: MatDialogRef<CompaniesComponent>,
  ) { }

  ngOnInit(): void {
  }

  onClose(){
    this.companiesService.form.reset();
    this.companiesService.initialForm();
    this.modalRef.close();
  }

  onSubmit() {
    console.log(this.companiesService.form.get('id').value,this.companiesService.form.value);
    if (this.companiesService.form.valid) {
      if (!this.companiesService.form.get('id').value){
        this.companiesService.insert(this.companiesService.form.value).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error) 
        );
        this.onClose();
        this.notification.getDisplayNotification('Cambios realizados con exitos','success');
      }
      else {
        this.companiesService.update(this.companiesService.form.value,this.companiesService.form.get('id').value).subscribe(
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
