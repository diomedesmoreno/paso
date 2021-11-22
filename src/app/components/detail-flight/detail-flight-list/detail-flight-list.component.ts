import { DetailFlightComponent } from './../detail-flight.component';
// import { Component, OnInit } from '@angular/core';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
// import { DetailFlightComponent } from '../user/user.component';

import { DetailService } from '../../../services/detail/detail.service';
import { TokenService } from '../../../services/token.service';
import { MessengerNotification } from '../../../messenger-notification';

interface FieldTable {
  id: number;
  name: string;
  countryFrom: string;
  // countryTo: string;
  numberPassengers: string;
}

export interface User {
  id: number;
  name: string;
  countryFrom: string;
  // countryTo: string;
  numberPassengers: string;
}

@Component({
  selector: 'app-detail-flight-list',
  templateUrl: './detail-flight-list.component.html',
  styleUrls: ['./detail-flight-list.component.css']
})
export class DetailFlightListComponent implements OnInit {

  private notification = new MessengerNotification();
  public error = [];
  // private dataSource: any;
  private displayedColumns: string[];
  public accion: string;
  private dataSource: any = [
    {'id':1,name: 'Vuelo AIR RD-USA',countryFrom: ' Republica dominicana',numberPassengers: '2'},
    {'id':2,name: 'Vuelo AIR USA-RD',countryFrom: ' Estados unidos',numberPassengers: '3'},
    {'id':3,name: 'Vuelo AIR RD-UK',countryFrom: ' Republica dominicana',numberPassengers: '1'},
    {'id':4,name: 'Vuelo AIR UK-RD',countryFrom: ' Reino unido',numberPassengers: '2'},
    {'id':5,name: 'Vuelo AIR RD-ES',countryFrom: ' Republica dominicana',numberPassengers: '1'},
  ];

  constructor(
    public dialog: MatDialog,
    private detailService: DetailService,
    private token: TokenService,
  ) { 
    this.displayedColumns = ['id', 'name', 'countryFrom', 'numberPassengers', 'options'];

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngOnInit(): void {
    this.detailService.initializeFormGroup();
    this.detailService.get()
    .subscribe(
      data => {
        this.handleResponse(data['data']);
      },
      error => {
        console.log("Error: ",error);
      }
      );
  }
  updateTable(): void{
    
    this.detailService.get()
    .subscribe(
      data => {
        this.handleResponse(data['data']);
      },
      error => {
        this.handleError(error);
      }
      );
  }

  handleResponse(data) {
    console.log("me actualices despues de todo",data);
    // this.dataSource = new MatTableDataSource<FieldTable>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  handleError(errors) {
    this.error = errors.error.error;
    if (this.error.length)
      this.notification.getDisplayErrors(this.error);
    else 
    this.notification.getDisplayNotification('Opss.. ocurrio un error con el servidor','danger');
    console.log(this.error);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(row) {
    this.detailService.edit(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    let afterCloseModal = this.dialog.open(DetailFlightComponent,dialogConfig);
    afterCloseModal.afterClosed().subscribe(() => { 
      this.updateTable();
     } );
    //  this.dataSource = new MatTableDataSource <FieldTable>(data);
  }

  onCreate() {
    this.accion = 'Agregar ';
    this.detailService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    let afterCloseModal = this.dialog.open(DetailFlightComponent,dialogConfig);
    afterCloseModal.afterClosed().subscribe(() => { 
      this.updateTable();
     } );
  }

}
