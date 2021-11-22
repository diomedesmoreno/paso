import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
// import { MapsComponent } from './maps/maps.component';
import { PopUpService } from './popup.service';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MarkerService } from './marker.service';

import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { AuthLoginService } from './services/auth-login.service';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { ConfirmDialogComponent } from './components/shared/confirm-dialog/confirm-dialog.component';
import { environment } from '../environments/environment';
import { ShapeService } from './shape.service';
import { MapLeafletComponent } from './maps/map-leaflet/map-leaflet.component';
// import { google } from '@google/maps';
// import { GoogleMapsModule } from '@angular/google-maps'

// import {MatButtonModule} from '@angular/material/button';
// import {MatInputModule} from '@angular/material/input';
// import {MatRippleModule} from '@angular/material/core';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatTooltipModule} from '@angular/material/tooltip';
// import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCcUogyIWrlCy1HlQTVMKe3j0Yr7l-gHD4'
      // apiKey: environment.YOUR_GOOGLE_MAPS_API_KEY
    }),
    // google
    // GoogleMapsModule
    // FormsModule,
    // ReactiveFormsModule,
    // MatButtonModule,
    // MatRippleModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatSelectModule,
    // MatTooltipModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    MapLeafletComponent,
    // ConfirmDialogComponent,

  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [
    AuthLoginService, 
    TokenService, 
    AuthService, 
    AfterLoginService, 
    BeforeLoginService,
    MarkerService,
    PopUpService,
    ShapeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
