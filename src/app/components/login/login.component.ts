import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import {ErrorStateMatcher} from '@angular/material/core';

import { AuthLoginService } from '../../services/auth-login.service';
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/auth.service';
import { MessengerNotification } from '../../messenger-notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
}) 
export class LoginComponent implements OnInit {

  form: FormGroup;
  public error = [];
  private url: string;
  private notification = new MessengerNotification();

  constructor(
    private formBuilder: FormBuilder,
    private loginService: AuthLoginService,
    private Token: TokenService,
    private router: Router,
    private routerReturn: ActivatedRoute,
    private Auth: AuthService
  ) {
    this.form = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
   }

  onSubmit() {
    if (!this.form.invalid){
      const login: any = {
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value
      }
      this.loginService.login(login).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }
    
  }

  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl(this.url);
    this.notification.getDisplayNotification('Usuario logueado con exitos!','success');
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
    this.url = this.routerReturn.snapshot.queryParams["urlReturn"];
  }

}
