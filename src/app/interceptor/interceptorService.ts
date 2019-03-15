import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpErrorResponse,
    HttpSentEvent,
    HttpHeaderResponse,
    HttpProgressEvent,
    HttpResponse,
    HttpEvent,
    HttpUserEvent } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs/';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class InterceptorService implements HttpInterceptor { //  implements HttpInterceptor

    constructor (private injector: Injector, private _cookieService: CookieService, ) {}

    private goTo(url: string): void {
        setTimeout(() => this.injector.get(Router).navigateByUrl(url));
    }

    private handleData(event: HttpResponse<any> | HttpErrorResponse ): Observable<any> {
        // 业务处理：一些通用操作
        const that = this;
        switch (event.status) {
            case 200:
            const jwt = event.headers.get('jwt');
            if (jwt) {
                localStorage.setItem('token', jwt);
            }
            return of(event); // break;

            case 403: // 过期状态码
            localStorage.removeItem('token');
            that.goTo('/login');
            // if (event['error'].message && event['error'].message.indexOf('expired') > 0) {
            //     localStorage.removeItem('token');
            //     that.goTo('/login');
            // } else if (event['message'] && event['message'] === 'Missing or invalid Authorization header') {
            //     localStorage.removeItem('token');
            //     that.goTo('/login');
            // }
            return throwError(event); // break;
            default:
            return throwError(event); // break;
        }
        // return of(event);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable <
        | HttpSentEvent
        | HttpHeaderResponse
        | HttpProgressEvent
        | HttpEvent<any>
        | HttpResponse<any>
        | HttpUserEvent<any>> {
        const url = req.url;
        const newReq = req.clone({
            url: url,
        });
        return next.handle(newReq).pipe(
            catchError((httpError: HttpErrorResponse) => {
                return this.handleData(httpError);
            }),
            mergeMap((event: any) => {
                // 允许统一对请求错误处理，这是因为一个请求若是业务上错误的情况下其HTTP请求的状态是200的情况下需要
                if (event instanceof HttpResponse && event.status === 200) {
                    return this.handleData(event);
                }
                // 若一切都正常，则后续操作
                return of(event);
            })
        );
   }

}
