import { PassengerComponent } from './../passenger/passenger.component';
import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';

import { PassengerService } from '../../services/passenger/passenger.service';
import { TokenService } from '../../services/token.service';
import { MessengerNotification } from '../../messenger-notification';

interface FieldTable {
  id: number;
  name: string;
  lastname: string;
  email: string;
  birthday: string;
}

export interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  birthday: string;
  password: string;
}

@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.css']
})
export class PassengerListComponent implements OnInit {
  private notification = new MessengerNotification();
  public error = [];
  private dataSource: any;
  // private dataSource: any = [
  //   {'id':1,name: 'Juan',lastname: ' Alexander',email: 'alexander@example.com',birthday: '1990-01-01'},
  //   {'id':2,name: 'Roberto',lastname: ' Morillo',email: 'Morillo@example.com',birthday: '1990-01-01'},
  //   {'id':3,name: 'Teodoro',lastname: ' Montero',email: 'Montero@example.com',birthday: '1990-01-01'},
  //   {'id':4,name: 'Javier',lastname: ' Moquete',email: 'Moquete@example.com',birthday: '1990-01-01'},
  //   {'id':5,name: 'Rafael',lastname: ' Molina',email: 'Molina@example.com',birthday: '1990-01-01'},
  // ];
  private displayedColumns: string[];
  public accion: string;

  constructor(
    public dialog: MatDialog,
    private passengerService: PassengerService,
    private token: TokenService,
  ) { 
    this.displayedColumns = ['id', 'name','lastname', 'email', 'birthday', 'options'];
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.passengerService.initializeFormGroup();
    this.passengerService.get()
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
    this.passengerService.get()
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
    this.dataSource = new MatTableDataSource<FieldTable>(data);
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

  editPassenger(row) {
    this.passengerService.editPassenger(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    let afterCloseModal = this.dialog.open(PassengerComponent,dialogConfig);
    afterCloseModal.afterClosed().subscribe(() => { 
      this.updateTable();
     } );
  }

  onCreate() {
    this.accion = 'Agregar ';
    this.passengerService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    let afterCloseModal = this.dialog.open(PassengerComponent,dialogConfig);
    afterCloseModal.afterClosed().subscribe(() => { 
      this.updateTable();
     } );
  }

}
