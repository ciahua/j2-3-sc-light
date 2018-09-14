
import { Component, Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/';
import { Http, Headers, Response } from '@angular/http';
import { CookieService } from 'ngx-cookie';

import { of } from 'rxjs/';
import { tap, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { WindowRef } from '../windowserver';

import { Point } from '../data/point.type';
import { map } from 'rxjs/operators';


@Injectable()
export class AirmonitorService {

    constructor(private http: Http) {
    }
    // 获取指定坐标范围内的所有设备
    getAirDevice(ne: Point, sw: Point): Observable<any> {
        return this.http.post(`/api/airmonitor/inbounds`, {
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
    // 获取指定设备的多项历史数据
    getHistoryData(id: number, from: string, to: string, page: number, pageSize: number): Observable<any> {
        return this.http.get(`/api/airmonitor/history/${id}?from=${from}&to=${to}&page=${page}&pageSize=${pageSize}`)
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();
                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();
                }
            }));
    }

    // 获取历史数据的统计值
    getStatistics(id: number, field: string, agg: string, from: string, to: string, interval: string) {
        return this.http
        .get(`/api/airmonitor/stat/${id}/${field}/${agg}?from=${from}&to=${to}&interval=${interval}`)
            .pipe(map((res: Response) => {
                if (res.status === 200) {

                    const data = res.json();

                    return data;
                } else {

                    return res.json().code.toString();
                }
            }));
    }
}
