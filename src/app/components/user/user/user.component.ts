import { UserListComponent } from './../user-list/user-list.component';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

import { UsersService } from '../../../services/users/users.service';
import { TokenService } from '../../../services/token.service';
import { MessengerNotification } from '../../../messenger-notification';

// 
@Component({ 
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public notification = new MessengerNotification();
  public error = [];
  // public genders = [
  //   {key:'F', name: 'Femenino'},
  //   {key:'M', name: 'Masculino'}
  // ];
  public accion: string;

  constructor(
    public usersService: UsersService,
    public token: TokenService,
    public dialogRef: MatDialogRef<UserComponent>,
    // private UserList: UserListComponent
  ) {
   }

  ngOnInit(): void {
    // this.usersService.allUsers()
    // .subscribe(
    //   data => {
    //     console.log("0",data['data']);
    //     this.dataSource = data['data'];
    //     this.handleResponse(data['data']);
    //   },
    //   error => {
    //     console.log("Error: ",error);
    //   }
    //   );
    // 
  }

  onClean(){
    // this.usersService.form.setValue({
    //   id: null,
    //   fullName:"",
    //   email:"",
    //   gender:"",
    //   birthday:"",
    // });
  }

  onClose(){
    this.usersService.form.reset();
    this.usersService.initializeFormGroup();
    // this.UserList.updateTable();
    this.dialogRef.close();
  }

  onSubmit() {
    // !this.form.invalid
    if (this.usersService.form.valid) {
      if (!this.usersService.form.get('id').value){
        this.usersService.insert(this.usersService.form.value).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error)
        );
        this.onClose();
        this.notification.getDisplayNotification('Cambios realizados con exitos','success');
      }
      else {
        this.usersService.update(this.usersService.form.value,this.usersService.form.get('id').value).subscribe(
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

// }
