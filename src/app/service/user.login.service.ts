import { Injectable } from '@angular/core';
import { Http,  Response } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';

import { WindowRef } from '../windowserver';
import 'rxjs/add/operator/map';

@Injectable()
export class UserLoginService {
    public token: string;
    public userId: string;
    constructor(private http: Http,
         private winRef: WindowRef, private _cookieService: CookieService) {
        // set token if saved in local storage
        let currentUser: any;
        if (this._cookieService.getObject('currentUser')) {
            // currentUser = JSON.parse(this._cookieService.getObject('currentUser'));
            currentUser = this._cookieService.getObject('currentUser');
        }
        this.token = currentUser && currentUser.token;
        this.userId = currentUser && currentUser.userId;
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post('/manager/auth/login', JSON.stringify({ loginName: username, password: password }))
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const token = res.json() && res.json().token;
                    const userId = res.json() && res.json().userId;
                    if (token) {
                        this.token = token;
                        this.userId = userId;
                        // 设置全局变量
                        this.winRef.nativeWindow.userId = this.userId;
                        this._cookieService.putObject('currentUser', JSON.stringify({ loginName: username, token: token, userId: userId }));
                        return true;
                    } else {
                        return false;
                    }
                } else if (res.status === 202) {
                    return res.json().code.toString();

                }
            }));
    }

    logout(): void {
        this.token = null;
        this._cookieService.remove('currentUser');
        // sessionStorage.removeItem('currentUser');
    }
}
