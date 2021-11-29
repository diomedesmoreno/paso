import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MessengerNotification } from 'app/messenger-notification';

import { TypesPlanesService } from 'app/services/typesPlanes/typesPlanes.service';
import { CountryService } from 'app/services/country/country.service';
import { TypesPlanesComponent } from '../types-planes.component';


interface FieldTable {
  id: number;
  name: string;
  description: string;
  types_classes: string;
}

@Component({
  selector: 'app-types-planes-list',
  templateUrl: './types-planes-list.component.html',
  styleUrls: ['./types-planes-list.component.css']
})
export class TypesPlanesListComponent implements OnInit {

  private notification = new MessengerNotification();
  public errors: string[];
  private dataSource: any = [];
  private displayColumns: string[]; 
  
  constructor(
    private modal: MatDialog,
    private typesPlanesService: TypesPlanesService,
    private countryServices: CountryService,
  ) { 
    this.displayColumns = ['id', 'name', 'description','types_classes','options'];
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.typesPlanesService.get()
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
    this.typesPlanesService.get()
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
    this.typesPlanesService.setForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    let afterCloseModal = this.modal.open(TypesPlanesComponent,dialogConfig);
    afterCloseModal.afterClosed().subscribe(() => { 
      this.updateTable();
     } );
  }

  onCreate() {
    this.typesPlanesService.initialForm();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    let afterCloseModal = this.modal.open(TypesPlanesComponent,dialogConfig);
    afterCloseModal.afterClosed().subscribe(() => { 
      this.updateTable();
     } );
    
  }

}
