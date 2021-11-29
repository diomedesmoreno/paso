import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MessengerNotification } from 'app/messenger-notification';

import { CompaniesService } from 'app/services/companies/companies.service';
import { CountryService } from 'app/services/country/country.service';
import { CompaniesComponent } from '../companies/companies.component';

interface FieldTable {
  id: number;
  name: string;
  description: string;
  }

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})

export class CompaniesListComponent implements OnInit {
  private notification = new MessengerNotification();
  public error: string[];
  public paisOrigen: any= [];
  private displayColumns: string[]; 
  public errors: string[];
  private dataSource: any = [];

  constructor(
    private modal: MatDialog,
    private companiesService: CompaniesService,
    private countryServices: CountryService,
  ) {
    this.displayColumns = ['id', 'description', 'name','options'];
   }

   @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.companiesService.get()
    .subscribe(
      data  => { this.responde(data["data"]); },
      error => { this.errorResponde(error); }
    )
  }

  private responde(data): void {
    this.dataSource = new MatTableDataSource <FieldTable>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private errorResponde(error): void {
    this.errors = error.error.error;
    if (this.errors.length)
      this.notification.getDisplayErrors(this.errors);
    else 
      this.notification.getDisplayNotification('Opss.. ocurrio un error con el servidor','danger');
      console.log(this.errors);
  }

  updateTable(): void {
    this.companiesService.get()
    .subscribe(
      data => {
        this.responde(data['data']);
      },
      error => {
        this.errorResponde(error);
      }
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editFlight(row) {
    this.companiesService.setForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    let afterCloseModal = this.modal.open(CompaniesComponent,dialogConfig);
    afterCloseModal.afterClosed().subscribe(() => { 
      this.updateTable();
     } );
  }

  onCreate() {
    this.companiesService.initialForm();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    let afterCloseModal = this.modal.open(CompaniesComponent,dialogConfig);
    afterCloseModal.afterClosed().subscribe(() => { 
      this.updateTable();
     } );
    
  }


}
