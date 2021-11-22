import { PassengerListComponent } from './../../components/passenger-list/passenger-list.component';
import { FlightListComponent } from './../../components/flight/flight-list/flight-list.component';
import { DetailFlightListComponent } from './../../components/detail-flight/detail-flight-list/detail-flight-list.component';
import { TicketComponent } from './../../components/ticket/ticket.component';
import { PassengerComponent } from './../../components/passenger/passenger.component';
import { DetailFlightComponent } from './../../components/detail-flight/detail-flight.component';
import { FlightComponent } from './../../components/flight/flight.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
// import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { LoginComponent } from '../../components/login/login.component';
import { BeforeLoginService } from '../../services/before-login.service';
import { AfterLoginService } from '../../services/after-login.service';
import { ChangePasswordComponent } from 'app/components/user/change-password/change-password.component';
import { ProfileComponent } from 'app/components/user/profile/profile.component';
import { UserComponent } from 'app/components/user/user/user.component';
import { UserListComponent } from './../../components/user/user-list/user-list.component';
import { MapLeafletComponent } from 'app/maps/map-leaflet/map-leaflet.component';
import { SchoolListComponent } from 'app/components/school/school-list/school-list.component';
import { AssessmentExamComponent } from 'app/components/assessment-exam/assessment-exam.component';
import { MyPracticeComponent } from 'app/components/my-practice/my-practice.component';
import { MyTurnComponent } from 'app/components/my-turn/my-turn.component';
import { GeneralInformationComponent } from 'app/components/general-information/general-information.component';

// import { SignupComponent } from '../../components/signup/signup.component';


export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    
    { path: 'dashboard',            component: DashboardComponent },
    { path: 'user-profile',         component: UserProfileComponent },
    { path: 'table-list',           component: TableListComponent },
    { path: 'typography',           component: TypographyComponent },
    { path: 'icons',                component: IconsComponent },
    { path: 'maps',                 component: MapLeafletComponent },
    // { path: 'maps',                 component: MapsComponent },
    { path: 'notifications',        component: NotificationsComponent },
    { path: 'upgrade',              component: UpgradeComponent },
    { path: 'change-password',      component: ChangePasswordComponent },
    { path: 'profile',              component: ProfileComponent },
    { path: 'users',                component: UserListComponent },
    { path: 'schools',              component: SchoolListComponent },
    { path: 'examen',               component: AssessmentExamComponent },
    { path: 'practice',             component: MyPracticeComponent },
    { path: 'turn',                 component: MyTurnComponent },
    { path: 'information',          component: GeneralInformationComponent },

    { path: 'vuelos',          component: FlightListComponent },
    { path: 'details',          component: DetailFlightListComponent },
    { path: 'ticket',          component: TicketComponent },
    { path: 'pasajeros',          component: PassengerListComponent },
    
];
