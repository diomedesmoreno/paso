import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MessengerNotification } from 'app/messenger-notification';

import { AirportsService } from 'app/services/airports/airports.service';
import { CountryService } from 'app/services/country/country.service';
import { AirportsComponent } from './../airports.component';

interface FieldTable {
  id: number;
  countries_id: string;
  name: string;
  }
  
@Component({
  selector: 'app-airports-list',
  templateUrl: './airports-list.component.html',
  styleUrls: ['./airports-list.component.css']
})

export class AirportsListComponent implements OnInit {

  private notification = new MessengerNotification();
  public errors: string[];
  private dataSource: any = [];
  
  private displayColumns: string[]; 
  constructor(
    private modal: MatDialog,
    private airportService: AirportsService,
    private countryServices: CountryService,
  ) { 
    this.displayColumns = ['id', 'countries_id', 'name','options'];
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.airportService.get()
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
    this.airportService.get()
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

  edit(row) {
    this.airportService.setForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    let afterCloseModal = this.modal.open(AirportsComponent,dialogConfig);
    afterCloseModal.afterClosed().subscribe(() => { 
      this.updateTable();
     } );
  }

  onCreate() {
    this.airportService.initialForm();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    let afterCloseModal = this.modal.open(AirportsComponent,dialogConfig);
    afterCloseModal.afterClosed().subscribe(() => { 
      this.updateTable();
     } );
    
  }

}
