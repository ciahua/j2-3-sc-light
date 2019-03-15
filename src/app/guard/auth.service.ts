import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RightService } from '../service/right.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
    isLoggedIn = false;
    error: boolean;
    model: any;
    routerList: Array<any>;
    urlid: string;
    // store the URL so we can redirect after logging in
    // 存储URL以便在登录后可以重定向
    redirectUrl: string;

    public token: string;

    constructor(private http: HttpClient, private _cookieService: CookieService, public router: Router, public jwtHelper: JwtHelperService,
        private rightService: RightService) {

    }


    login(userName: String, password: String): Observable<any> {
        return this.http.post('/security/login', { 'userName': userName, 'password': password }, { responseType: 'text' })
            .pipe(map((res) => {
                const token = res;
                if (token) {
                    this.token = token;
                    // 设置全局变量
                    // this.winRef.nativeWindow.userId = this.userId;
                    this._cookieService.putObject('currentUser', JSON.stringify({ loginName: userName, token: token }));
                    // this.getAuthorities(token);

                    localStorage.setItem('token', token);
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
        localStorage.removeItem('Authorities');
        this.router.navigate(['/login']);
    }

    getAuthorities(token ) {
        const userId = this.jwtHelper.decodeToken(token).userid;
        this.getAuthoritiesByUserId(userId)
        .then(function (res) {
            localStorage.setItem('Authorities', JSON.stringify({ Authorities: res }));
        })
        .catch(function (reason) {
            console.log('Failed: ' + reason);
        });
    }

    // 获取用户权限
    getAuthoritiesByUserId(id) {
        const that = this;
        const promise = new Promise(function (resolve, reject) {
            that.rightService.getAuthoritiesByUserId(id).subscribe({
                next: function (val) {
                    console.log('获取用户权限');
                    const res = that.getVaule(val);
                    that.routerList = [];
                    res.map((item, i) => {
                        that.routerList.push(that.getVaule(item)[0]);
                    });
                },
                complete: function () {
                    resolve(that.routerList);
                },
                error: function (error) {
                    console.log(error);
                    reject(error);
                }
            });
        });
        return promise;

    }


    // 获取对象value
    getkeys(obj) {
        if (!obj) {
            return;
        }
        return Object.keys(obj);
    }

    // 获取对象value
    getVaule(obj) {
        if (!obj) {
            return;
        }
        return Object.values(obj);
    }

}


/*

Copyright(c): 2018 深圳创新设计研究院
Author: luo.shuqi@live.com
@file: auth.service.ts
@time: 2018 / 7 / 2 17: 18

*/

