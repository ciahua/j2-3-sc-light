
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';


@Injectable()
export class AirmonitorService {

    constructor(private http: HttpClient) {
    }
    // 获取指定坐标范围内的所有设备
    getAirDevice(ne: any, sw: any): Observable<any> {
        return this.http.post(`/api/airmonitor/inbounds`, {
            'ne': ne,
            'sw': sw
        })
            .pipe(map((res) => {
                return res;
            }));
    }
    // 获取指定设备的多项历史数据
    getHistoryData(id: number, from: string, to: string, page: number, pageSize: number): Observable<any> {
        return this.http.get(`/api/airmonitor/history/${id}?from=${from}&to=${to}&page=${page}&pageSize=${pageSize}`)
            .pipe(map((res) => {
                return res;
            }));
    }

    // 获取历史数据的统计值
    getStatistics(id: number, field: string, agg: string, from: string, to: string, interval: string) {
        return this.http
        .get(`/api/airmonitor/stat/${id}/${field}/${agg}?from=${from}&to=${to}&interval=${interval}`)
            .pipe(map((res) => {
                return res;
            }));
    }
}
