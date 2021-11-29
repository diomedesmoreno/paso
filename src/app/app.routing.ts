import { AuthenticationGuard } from './authentication/authentication.guard';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FlightReservationsComponent } from './components/flight-reservations/flight-reservations.component';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { SendResetPasswordComponent } from './components/resetPassword/send-reset-password/send-reset-password.component';
import { ResponseResetPasswordComponent } from './components/resetPassword/response-reset-password/response-reset-password.component';
import { ErrorNoFoundComponent } from './components/error/error-no-found/error-no-found.component';

const routes: Routes =[
  // {
  //   path: '',
  //   component: LoginComponent,
    // canActivate: [AuthenticationGuard]
  // },
  // {
  //   path: '',
  //   // redirectTo: 'login',
  //   // pathMatch: 'full',
  //   component: LoginComponent,
  //   canActivate: [BeforeLoginService]
  // },
  
  {
    path: 'reservacion2',
    component: FlightReservationsComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'reservacion',
    component: FlightReservationsComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'reset-password',
    component: SendResetPasswordComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'response-password',
    component: ResponseResetPasswordComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AfterLoginService]
  }, 
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }],
    canActivate: [AfterLoginService]
  },
  {
    path: '**',
    component: ErrorNoFoundComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
