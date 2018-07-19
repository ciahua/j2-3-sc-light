
import { Component, Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/';
import { of } from 'rxjs/';
import { tap, delay } from 'rxjs/operators';
import { Http, Headers, Response } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { WindowRef } from '../windowserver';

import { REGIONLIST } from '../data/region-list';
import { BLOCKLIST } from '../data/block-list';
import { COMMUNITYLIST } from '../data/community-list';
import { CITYLIST } from '../data/city-list';
import { DEVICELIIST } from '../data/device-list';
import { Point } from '../data/point.type';
// baidu map


@Injectable()
export class MonitorService {

    constructor(private http: Http) {


    }

    getDefaultZone(): Observable<any> {
        // console.log(sw, ne, zoom);
        return of(CITYLIST)
            .pipe(
                delay(1000),
                tap(val => {
                    console.log(val);
                    return val;
                })
            );

    }

    getCity(): Observable<any> {
        // console.log(sw, ne, zoom);
        return of(CITYLIST)
            .pipe(
                delay(1000),
                tap(val => {
                    console.log(val);
                    return val;
                })
            );

    }

    getDevice(): Observable<any> {
        // console.log(sw, ne, zoom);
        return of(DEVICELIIST)
            .pipe(
                delay(1000),
                tap(val => {
                    console.log(val);
                    return val;
                })
            );

    }

    getRegion(sw: Point, ne: Point, zoom: Number): Observable<any> {
        // console.log(sw, ne, zoom);
        return of(REGIONLIST.val.region_list)
        .pipe(
            delay(1000),
            tap(val => {
                // console.log(val);
                return val;
            })
        );

    }

    getBlock(sw: Point, ne: Point, zoom: Number): Observable<any> {
        // console.log(sw, ne, zoom);
        return of(BLOCKLIST.val.block_list)
        .pipe(
            delay(1000),
            tap(val => {
                // console.log(val);
                return val;
            })
        );
    }

    getCommunity(sw: Point, ne: Point, zoom: Number): Observable<any> {
        // console.log(sw, ne, zoom);
        return of(COMMUNITYLIST.val.community_list).pipe(
            delay(1000),
            tap(val => {
                // console.log(val);
                return val;
            })
        );
    }




}
