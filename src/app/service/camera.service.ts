
import { Component, Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/';
import { of } from 'rxjs/';
import { tap, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { WindowRef } from '../windowserver';


import { Point } from '../data/point.type';
import { map } from 'rxjs/operators';


@Injectable()
export class CameraService {

    constructor(private http: HttpClient) {


    }
    // 获取指定坐标范围内的摄像头信息
    getCameras(ne: Point, sw: Point): Observable<any> {
        return this.http.post('/api/camera/inbounds', {
            'ne': ne,
            'sw': sw
        })
            .pipe(map((res: Response) => {
                return res;
            }));
    }

}
