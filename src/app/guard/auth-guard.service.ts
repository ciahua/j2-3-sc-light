import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    NavigationExtras,
    CanLoad, Route
} from '@angular/router';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(private authService: AuthService, private router: Router, private _cookieService: CookieService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;

        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        const url = `/${route.path}`;

        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this._cookieService.getObject('currentUser')) {
            // if (sessionStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        } else {
            // not logged in so redirect to login page
            this.router.navigate(['/login']);
            return false;
        }
        // if (this.authService.isLoggedIn) { return true; }

        // // Store the attempted URL for redirecting
        // this.authService.redirectUrl = url;

        // // Create a dummy session id
        // const sessionId = 123456789;

        // // Set our navigation extras object
        // // that contains our global query params and fragment
        // const navigationExtras: NavigationExtras = {
        //     queryParams: { 'session_id': sessionId },
        //     fragment: 'anchor'
        // };

        // // Navigate to the login page with extras
        // // this.router.navigate(['/login'], navigationExtras);
        // this.router.navigate(['/login']);
        // return false;
    }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
