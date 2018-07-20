
import { Component, Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/';
import { of } from 'rxjs/';
import { tap, delay } from 'rxjs/operators';
import { Http, Headers, Response } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { WindowRef } from '../windowserver';
import { MESSAGELIST } from '../data/message-list';

import { Point } from '../data/point.type';
// baidu map


@Injectable()
export class MessageService {

    constructor(private http: Http) {


    }

    getMessage(): Observable<any> {
        // console.log(sw, ne, zoom);
        return of(MESSAGELIST)
            .pipe(
                delay(1000),
                tap(val => {
                    console.log(val);
                    return val;
                })
            );

    }




}
