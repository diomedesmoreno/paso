import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { TokenService } from 'app/services/token.service';
import { AuthService } from 'app/services/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
} 
export const ROUTES: RouteInfo[] = [
    // { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/users', title: 'User',  icon: 'person', class: '' },
    // { path: '/schools', title: 'School',  icon: 'home', class: '' },
    // { path: '/examen', title: 'Simulador',  icon: 'home', class: '' },
    // { path: '/practice', title: 'Mis practicas',  icon: 'home', class: '' },
    // { path: '/turn', title: 'Mis Turnos',  icon: 'home', class: '' }, 
    // { path: '/information', title: 'Información general',  icon: 'home', class: '' }, 

    { path: '/aerolineas', title: 'Aerolinea',  icon: 'business', class: '' }, 
    { path: '/aeropuerto', title: 'Aeropuerto',  icon: 'local_airport', class: '' }, 
    { path: '/tipo-avion', title: 'Tipos de aviones',  icon: 'connecting_airports', class: '' }, 
    { path: '/aviones', title: 'Aviones',  icon: 'flight', class: '' }, 

    { path: '/vuelos', title: 'Crear vuelo',  icon: 'airplanemode_active', class: '' }, 
    { path: '/pasajeros', title: 'Crear pasajero',  icon: 'person', class: '' },
    
    { path: '/ticket', title: 'Ticket',  icon: 'airplane_ticket', class: '' }, 
    { path: '/details', title: 'Lista de vuelos',  icon: 'library_books', class: '' }, 
    { path: '/seat', title: 'Reservación de asientos',  icon: 'library_books', class: '' }, 

    { path: '/reservacion2', title: 'reservacion2',  icon: 'airline_seat_recline_extra', class: '' }, 

    // { path: '/ticket', title: 'Ticket',  icon: 'home', class: '' }, 
    // { path: '/typesPlanes', title: 'Tipos de aviones',  icon: 'library_books', class: '' }, 
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
//     <span class="material-icons-outlined">

// </span>
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private translate: TranslateService,private router:Router,private token: TokenService, private auth: AuthService ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  changeLang(lang):void {
    this.translate.setDefaultLang('es');
    localStorage.setItem('language','es');
  }

  logout(event: MouseEvent): void{
    event.preventDefault();
    this.token.remove();
    this.auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
}
}
