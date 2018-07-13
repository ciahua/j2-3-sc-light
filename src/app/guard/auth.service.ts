import { Component, Injectable, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/';
import { of } from 'rxjs/';
import { tap, delay } from 'rxjs/operators';
// import { UserLoginService} from '../service/user.login.service';


import { Http, Headers, Response } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';


import { WindowRef } from '../windowserver';



@Injectable()
export class AuthService {
    isLoggedIn = false;
    error: boolean;
    model: any;

    // store the URL so we can redirect after logging in
    redirectUrl: string;
    HEROES = {
        token: Date(),
        userId: 'lsq1098',
        status: 200
    };

    public token: string;
    public userId: string;
    constructor(private http: Http,
        private winRef: WindowRef, private _cookieService: CookieService,  public router: Router) {
        // set token if saved in local storage
        let currentUser: any;
        if (this._cookieService.getObject('currentUser')) {
            // currentUser = JSON.parse(this._cookieService.getObject('currentUser'));
            currentUser = this._cookieService.getObject('currentUser');

        }
        this.token = currentUser && currentUser.token;
        this.userId = currentUser && currentUser.userId;
    }


    login(username: string, password: string): Observable<any> {
        return of(this.HEROES).pipe(
            delay(1000),
            tap(val => {
                console.log(val);
                if (val.status === 200) {
                    const token = val.token;
                    const userId = val.userId;
                    if (token) {
                        this.token = token;
                        this.userId = userId;
                        // 设置全局变量
                        this.winRef.nativeWindow.userId = this.userId;
                        this._cookieService.putObject('currentUser', { loginName: username, token: token, userId: userId });
                        this.isLoggedIn = true;
                        return true;
                    } else {
                        this.isLoggedIn = false;
                        return false;
                    }
                }
            })
        );

        // return this.http.post('/manager/auth/login', JSON.stringify({ loginName: username, password: password }))
        //     .map((res: Response) => {
        //         if (res.status === 200) {
        //             const token = res.json() && res.json().token;
        //             const userId = res.json() && res.json().userId;
        //             if (token) {
        //                 this.token = token;
        //                 this.userId = userId;
        //                 // 设置全局变量
        //                 this.winRef.nativeWindow.userId = this.userId;
        //                 this._cookieService.putObject('currentUser',
        //  JSON.stringify({ loginName: username, token: token, userId: userId }));
        //                 this.isLoggedIn = true;
        //                 return true;
        //             } else {
        //                 this.isLoggedIn = false;
        //                 return false;
        //             }
        //         } else if (res.status === 202) {
        //             return res.json().code.toString();

        //         }
        //     });
    }

    logout(): void {
        this.isLoggedIn = false;
        this.token = null;
        this._cookieService.remove('currentUser');
        this.router.navigate(['/login']);
    }

}


/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: auth.service.ts
@time: 2018 / 7 / 2 17: 18

*/

