import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router'; 

import { AuthLoginService } from '../../../services/auth-login.service';
import { TokenService } from '../../../services/token.service';
import { AuthService } from '../../../services/auth.service';
import { MessengerNotification } from '../../../messenger-notification';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  private form: FormGroup;
  public error = [];
  private notification = new MessengerNotification();

  constructor(
    private formBuilder: FormBuilder,
    private loginService: AuthLoginService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
  ) {
    this.form = formBuilder.group({
      oldPassword: ['', [Validators.required,Validators.maxLength(100),Validators.minLength(4)]],
      newPassword: ['', Validators.required,Validators.maxLength(100),Validators.minLength(4)],
    });
   }

   onSubmit() {
    const change: any = {
      oldPassword: this.form.get('oldPassword')?.value,
      password: this.form.get('newPassword')?.value
    }
    this.loginService.changePasswordIn(change).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('/dashboard');
    this.notification.getDisplayNotification('Contraseña cambiada con exitos!','success');
  }

  handleError(error) {
    this.error = error.error.error;
    if (this.error.length)
      this.notification.getDisplayErrors(this.error);
    else 
      this.notification.getDisplayNotification('Opss.. ocurrio un error con el servidor','danger');
    console.log(this.error);
  }
  
  ngOnInit(): void {
  }

}
