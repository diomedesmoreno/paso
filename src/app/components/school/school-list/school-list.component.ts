import { SchoolComponent } from './../school.component';
import { TokenService } from 'app/services/token.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MessengerNotification } from 'app/messenger-notification';
import { FlightService } from 'app/services/flight/flight.service';
import { data } from 'jquery';
import { MatTableDataSource } from '@angular/material/table';

interface FieldTable {
id: number;
name: string;
description: string;
logo_url: string;
document: string;
}

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css']
})
export class SchoolListComponent implements OnInit {
  
  private notification = new MessengerNotification();
  public errors: string[];
  private dataSource: any;
  private displayColumns: string[]; 
  public url = "http://localhost:8000/img/";

  constructor(
    private modal: MatDialog,
    private token: TokenService,
    private schoolService: FlightService
  ) {
    this.displayColumns = ['id', 'name', 'description', 'logo_url', 'document','options'];
   }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.schoolService.get()
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
    // console.log("me actualices despues de todo");
    this.schoolService.get()
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

  editUser(row) {
    this.schoolService.setForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    let afterCloseModal = this.modal.open(SchoolComponent,dialogConfig);
    afterCloseModal.afterClosed().subscribe(() => { 
      this.updateTable();
     } );
  }

  onCreate() {
    this.schoolService.initialForm();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    let afterCloseModal = this.modal.open(SchoolComponent,dialogConfig);
    afterCloseModal.afterClosed().subscribe(() => { 
      this.updateTable();
     } );
  }


}
