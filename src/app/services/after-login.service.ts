import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { TokenService } from './token.service';

@Injectable()
export class AfterLoginService implements CanActivate {

  constructor(private Token: TokenService,private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean |UrlTree> | Promise<boolean> {
    // console.log( "aftrer Soy: ",state.url,state.url === "/");

    if (!this.Token.loggedIn()) {
        this.router.navigate(['/login']);
      // console.log( "aftrer Soy: ",state.url === "/");
    } 

    return this.Token.loggedIn();
  }

}
