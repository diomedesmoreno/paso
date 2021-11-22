import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import { UserComponent } from '../user/user.component';

import { UsersService } from '../../../services/users/users.service';
import { TokenService } from '../../../services/token.service';
import { MessengerNotification } from '../../../messenger-notification';

interface FieldTable {
  id: number;
  name: string;
  email: string;
  // school: string;
  birthday: string;
  // gender: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  birthday: string;
  password: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  private notification = new MessengerNotification();
  public error = [];
  private dataSource: any;
  private displayedColumns: string[];
  // private genders = [
  //   {key:'F', name: 'Femenino'},
  //   {key:'M', name: 'Masculino'}
  // ];
  public accion: string;
  constructor(
    public dialog: MatDialog,
    private usersService: UsersService,
    private token: TokenService,
  ) {
    this.displayedColumns = ['id', 'name', 'email', 'birthday', 'options'];
   }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.usersService.initializeFormGroup();
    this.usersService.allUsers()
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
    
    this.usersService.allUsers()
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

  editUser(row) {
    this.usersService.editUser(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    let afterCloseModal = this.dialog.open(UserComponent,dialogConfig);
    afterCloseModal.afterClosed().subscribe(() => { 
      this.updateTable();
     } );
  }

  onCreate() {
    this.accion = 'Agregar ';
    this.usersService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    let afterCloseModal = this.dialog.open(UserComponent,dialogConfig);
    afterCloseModal.afterClosed().subscribe(() => { 
      this.updateTable();
     } );
  }

}
