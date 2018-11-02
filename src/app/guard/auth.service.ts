import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/';
import { of } from 'rxjs/';
import { tap, delay } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';


@Injectable()
export class AuthService {
    isLoggedIn = false;
    error: boolean;
    model: any;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    public token: string;

    constructor(private http: HttpClient, private _cookieService: CookieService,  public router: Router, ) {
        // set token if saved in local storage
        let currentUser: any;
        if (this._cookieService.getObject('currentUser')) {
            // currentUser = JSON.parse(this._cookieService.getObject('currentUser'));
            currentUser = this._cookieService.getObject('currentUser');

        }
        this.token = currentUser && currentUser.token;
    }


    login1(userName: String, password: String): Observable<any> {
        return this.http.post('/security/login', { 'userName': userName, 'password': password }, { responseType: 'text' })
            .pipe(map((res) => {
                const token = res;
                if (token) {
                    this.token = token;
                    // 设置全局变量
                    // this.winRef.nativeWindow.userId = this.userId;
                    // this._cookieService.putObject('aaaaaa', JSON.stringify({ loginName: userName }));
                    this._cookieService.putObject('currentUser', JSON.stringify({ loginName: userName, token: token }));
                    localStorage.setItem('token', token);
                    // this._cookieService.putObject('bbbbbb', JSON.stringify({ loginName: userName }));
                    this.isLoggedIn = true;
                    return true;
                } else {
                    this.isLoggedIn = false;
                    return false;
                }

            }));
    }
    logout(): void {
        this.isLoggedIn = false;
        this.token = null;
        this._cookieService.remove('currentUser');
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

}


/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: auth.service.ts
@time: 2018 / 7 / 2 17: 18

*/

