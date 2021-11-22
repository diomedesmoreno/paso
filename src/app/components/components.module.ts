import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { CdkTableModule } from '@angular/cdk/table';
import { TranslateModule,TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// 
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatSelectModule} from '@angular/material/select';
import { MatIconModule} from '@angular/material/icon';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatCardModule} from '@angular/material/card';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { MatDialogModule} from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { QuillModule } from 'ngx-quill';

// import { Component, NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
import { EditorModule } from '@progress/kendo-angular-editor';

// paola 
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { UserComponent } from './user/user/user.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { SendResetPasswordComponent } from './resetPassword/send-reset-password/send-reset-password.component';
import { ResponseResetPasswordComponent } from './resetPassword/response-reset-password/response-reset-password.component';
import { ErrorNoFoundComponent } from './error/error-no-found/error-no-found.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { SchoolComponent } from './school/school.component';
import { SchoolListComponent } from './school/school-list/school-list.component';
import { AssessmentExamComponent } from './assessment-exam/assessment-exam.component';
import { MyPracticeComponent } from './my-practice/my-practice.component';
import { MyTurnComponent } from './my-turn/my-turn.component';
import { GeneralInformationComponent } from './general-information/general-information.component';
import { FlightComponent } from './flight/flight.component';
import { FlightListComponent } from './flight/flight-list/flight-list.component';
import { PassengerComponent } from './passenger/passenger.component';
import { PassengerListComponent } from './passenger-list/passenger-list.component';
import { TicketComponent } from './ticket/ticket.component';
import { DetailFlightComponent } from './detail-flight/detail-flight.component';
import { DetailFlightListComponent } from './detail-flight/detail-flight-list/detail-flight-list.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatNativeDateModule,
    MatRippleModule,
    CdkTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    }),
    QuillModule.forRoot(),
    MatToolbarModule,
    MatGridListModule,
    MatMenuModule,
    MatFormFieldModule,
    MatProgressBarModule
    // MatRadioModule,
    // MatCheckboxModule,
    // MatSnackBarModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    ChangePasswordComponent,
    UserComponent,
    ConfirmDialogComponent,
    SendResetPasswordComponent,
    ResponseResetPasswordComponent,
    ErrorNoFoundComponent,
    UserListComponent,
    SchoolComponent,
    SchoolListComponent,
    AssessmentExamComponent,
    MyPracticeComponent,
    MyTurnComponent,
    GeneralInformationComponent,
    FlightComponent,
    FlightListComponent,
    PassengerComponent,
    PassengerListComponent,
    TicketComponent,
    DetailFlightComponent,
    DetailFlightListComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    // TranslateModule,
  ]
})
export class ComponentsModule { }



