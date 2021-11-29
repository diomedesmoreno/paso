import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router ,ActivatedRoute } from '@angular/router'; 

import { AuthLoginService } from '../../../services/auth-login.service';
import { TokenService } from '../../../services/token.service';
import { AuthService } from '../../../services/auth.service';
import { MessengerNotification } from '../../../messenger-notification';

@Component({
  selector: 'app-response-reset-password',
  templateUrl: './response-reset-password.component.html',
  styleUrls: ['./response-reset-password.component.css']
})
export class ResponseResetPasswordComponent implements OnInit {

  private form: FormGroup;
  public error = [];
  private notification = new MessengerNotification();

  constructor(
    private _Activatedroute:ActivatedRoute,
    private formBuilder: FormBuilder,
    private loginService: AuthLoginService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
  ) {
    this.form = formBuilder.group({
      newPassword: ['', [Validators.required,Validators.maxLength(100),Validators.minLength(4)]],
      password_confirmed: ['', [Validators.required,Validators.maxLength(100),Validators.minLength(4)]],
    });
   }

   onSubmit() {
     console.log(this.router);
    this.loginService.changePasswordEx({
      password: this.form.get('newPassword')?.value,
      resetToken: this.router.url.split('=')[1]
      // resetToken: "KJZra31XnAwTOdAubWU9PzaDdkSIYxiXbkGa2KjbPkmoFwZJRrOI8FS9cSR6"
    }).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    // this.Token.handle(data.access_token);
    // this.Auth.changeAuthStatus(true);
    this.notification.getDisplayNotification('Contraseña cambiada con exitos!','success');
    this.router.navigateByUrl('/login');
  }

  handleError(error) {
    this.error = error.error.error;
    console.log(this.error,error.error,error);
    // if (this.error.length)
    //   this.notification.getDisplayErrors(this.error);
    // else 
      this.notification.getDisplayNotification('Opss.. ocurrio un error con el servidor','danger');
      this.notification.getDisplayNotification(error.error.message,'danger');
    console.log(this.error);
  }

  ngOnInit(): void {
  }

}
