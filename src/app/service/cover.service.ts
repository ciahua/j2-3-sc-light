
import { Component, Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/';
import { of } from 'rxjs/';
import { tap, delay } from 'rxjs/operators';
import { Http, Headers, Response } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { WindowRef } from '../windowserver';


import { Point } from '../data/point.type';
import { map } from 'rxjs/operators';


@Injectable()
export class CoverService {

    constructor(private http: Http) {


    }


    // 获取详细的位置数据
    getCovers( ne: Point, sw: Point): Observable<any> {
        return this.http.post('/api/manhole/inbounds', {

            'ne': ne,
            'sw': sw

        })
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();
                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();
                }
            }));
    }




}
