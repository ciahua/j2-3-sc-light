
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
export class LightService {

    constructor(private http: HttpClient) {


    }


    // 获取详细的位置数据
    getLights(ne: Point, sw: Point): Observable<any> {
        return this.http.post('/api/streetlight/inbounds', {
            'ne': ne,
            'sw': sw
        })
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 临时控制路灯
    setLightsContr(id, level, stopTime): Observable<any> {
        return this.http.put('/api/streetlight/level', {
            'id': id,
            'level': level,
            'stopTime': stopTime
        })
            .pipe(map((res: Response) => {
                const data = { status: 200 };
                return data;
            }));
    }

    // 修改路灯控制策略
    setStrategyRule(id, ruleId): Observable<any> {
        return this.http.put('/api/streetlight/setrule', {
            'id': id,
            'ruleId': ruleId
        })
            .pipe(map((res: Response) => {
                const data = { status: 200 };
                return data;
            }));
    }

    // 获取策略表
    getStrategy(): Observable<any> {
        return this.http.get(`/api/streetlight/rule`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 设置多个指定路灯亮度
    setLightsLevel(ids, level, stopTime): Observable<any> {
        return this.http.put('/api/streetlight/levels', {
            'ids': ids,
            'level': level,
            'stopTime': stopTime
        })
            .pipe(map((res: Response) => {
                const data = { status: 200 };
                return data;
            }));
    }

    // 设置多个指定路灯策略并下发
    setLightsRule(ids, ruleId): Observable<any> {
        return this.http.put('/api/streetlight/setrules', {
            'ids': ids,
            'ruleId': ruleId
        })
            .pipe(map((res: Response) => {
                const data = { status: 200 };
                return data;
                // if (res.status === 200) {
                //     const data = { status: 200 };
                //     // console.log(res.json());
                //     return data;
                // } else if (res.status === 202) {
                //     return res.json().code.toString();
                // }
            }));
    }


}
