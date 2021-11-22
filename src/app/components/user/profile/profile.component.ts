import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router'; 

import { AuthLoginService } from '../../../services/auth-login.service';
import { TokenService } from '../../../services/token.service';
import { AuthService } from '../../../services/auth.service';
import { MessengerNotification } from '../../../messenger-notification';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  genders = [
    {key:'F', name: 'Female'},
    {key:'M', name: 'Mascule'}
  ];
  public form: FormGroup;
  public error = [];
  private url: string;
  private notification = new MessengerNotification();

  constructor(
    private formBuilder: FormBuilder,
    private profileService: AuthLoginService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
  ) { 
    this.form = formBuilder.group({
      fullName: ['', [Validators.required, Validators.maxLength(100),Validators.minLength(4)]],
      email: ['', [Validators.required,Validators.email,Validators.maxLength(100),Validators.minLength(12)]],
      birthday: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if (this.form.valid) {
        this.profileService.update(this.form.value,this.form.get('id').value).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error)
        );
        this.notification.getDisplayNotification('Cambios realizados con exitos','success');
      }
  }

  handleResponse(data) {
    this.Token.handle(data.access_token);
    // this.Auth.changeAuthStatus(true);
    // this.router.navigateByUrl(this.url);
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

}
