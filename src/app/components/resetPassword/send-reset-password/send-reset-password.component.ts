import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {ErrorStateMatcher} from '@angular/material/core';

import { AuthLoginService } from '../../../services/auth-login.service';
import { TokenService } from '../../../services/token.service';
import { AuthService } from '../../../services/auth.service';
import { MessengerNotification } from '../../../messenger-notification';

@Component({
  selector: 'app-send-reset-password',
  templateUrl: './send-reset-password.component.html',
  styleUrls: ['./send-reset-password.component.css']
})
export class SendResetPasswordComponent implements OnInit {

  form: FormGroup;
  public error = [];
  private notification = new MessengerNotification();
  
  constructor(
    private formBuilder: FormBuilder,
    private loginService: AuthLoginService,
    private Token: TokenService,
    private Auth: AuthService
  ) {
    this.form = formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
   }

   onSubmit() {
    if (!this.form.invalid){
      const send: any = {
        email: this.form.get('email')?.value
      }
      this.loginService.sendEmailLink(send).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }
  }

  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.notification.getDisplayNotification('Email enviado con exitos!','success');
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
