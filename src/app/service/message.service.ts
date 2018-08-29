
import { Component, Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/';
import { of } from 'rxjs/';
import { tap, delay } from 'rxjs/operators';
import { Http, Headers, Response } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { WindowRef } from '../windowserver';
import { MESSAGELIST } from '../data/message-list';
import { MESSAGELIST1 } from '../data/message-list-1';
import { MESSAGELIST2 } from '../data/message-list-2';

import { Point } from '../data/point.type';
// baidu map


@Injectable()
export class MessageService {

    constructor(private http: Http) {


    }

    getMessage(): Observable<any> {
        return of(MESSAGELIST)
            .pipe(
                delay(1000),
                tap(val => {

                    return val;
                })
            );

    }
    getMessage1(): Observable<any> {
        return of(MESSAGELIST1)
            .pipe(
                delay(1000),
                tap(val => {

                    return val;
                })
            );

    }
    getMessage2(): Observable<any> {
        return of(MESSAGELIST2)
            .pipe(
                delay(1000),
                tap(val => {

                    return val;
                })
            );

    }




}
