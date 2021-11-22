import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import * as jQuery from 'jquery';
// import 'bootstrap-notify';

import { AuthLoginService } from '../../services/auth-login.service';
import { TokenService } from '../../services/token.service';
// import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { MessengerNotification } from '../../messenger-notification';


// let $: any = jQuery;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public error = [];
  private form: FormGroup;
  private notification = new MessengerNotification();
  private genders = [
    {key:'F', name: 'Female'},
    {key:'M', name: 'Mascule'}
  ];

  constructor(
    private formBuilder: FormBuilder,
    private loginService: AuthLoginService,
    private Token: TokenService,
    private router: Router
  ) {
    this.form = formBuilder.group({
      email: ['', [Validators.required, Validators.email,Validators.maxLength(100),Validators.minLength(12)]],
      name: ['', [Validators.required,Validators.maxLength(100),Validators.minLength(4)]],
      password: ['', [Validators.required,Validators.maxLength(100),Validators.minLength(4)]],
      password_confirmation: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      // gender: ['', [Validators.required]]
    });
   }

  onSubmit() {
    if (!this.form.invalid){
      const sign: any = {
        email: this.form.get('email')?.value,
        name: this.form.get('name')?.value,
        password: this.form.get('password')?.value,
        password_confirmation: this.form.get('password_confirmation')?.value,
        birthday: this.form.get('birthday')?.value,
        // gender: this.form.get('gender')?.value,
      }
      this.loginService.signup(sign).subscribe(
        data => this.handleResponse(data),
        error => {this.handleError(error)}
      );
    }
    
  }
  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.router.navigateByUrl('/dashboard');
    this.notification.getDisplayNotification('Usuario creado con exitos!','success');
  }

  handleError(error) {
    this.error = error.error.errors;
    // console.log(Object.keys(this.error));
    this.notification.getDisplayErrors(this.error);
    // this.notification.getDisplayNotification('Opss.. ocurrio un error!','danger');
  }
  ngOnInit(): void {
  }

}
