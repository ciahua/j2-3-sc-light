
import { Component, Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/';
import { of } from 'rxjs/';
import { tap, delay } from 'rxjs/operators';
import { Http, Headers, Response } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { WindowRef } from '../windowserver';

import { COMMUNITYLIST } from '../data/community-list';


import { Point } from '../data/point.type';
import { map } from 'rxjs/operators';


@Injectable()
export class MonitorService {

    constructor(private http: Http) {


    }
    // 设备列表
    getDevice(): Observable<any> {
        return this.http.get('/api/device/type/all')
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();
                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();

                }
            }));

    }

    // 城市列表
    getZoneDefault(): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get('/api/zone/default')
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();
                    data.regions[0].open = true;
                    data.regions[0].children[0].open = true;
                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();

                }
            }));
    }

    // 获取按区域汇总的位置数据
    getRegions(sw: Point, ne: Point, level: number, type: number): Observable<any> {
        return this.http.post(`/api/position/inbounds/sum/${level}`, {
            'bounds': {
                'ne': ne,
                'sw': sw
            },
            'device_type': type
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



    // 获取详细的位置数据
    getDetails(sw: Point, ne: Point, zoom: Number, type: Number): Observable<any> {
        return this.http.post('/api/position/inbounds/details', {
            'bounds': {
                'ne': ne,
                'sw': sw
            },
            'device_type': type
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

    // 获取指定位置所挂设备参数定义
    getDeviceDetails(positionId: string, deviceType: Number): Observable<any> {
        return this.http.get(`/api/position/device?positionId=${positionId}&deviceType=${deviceType}`)
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
