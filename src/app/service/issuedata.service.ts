
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';

import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';


@Injectable()
export class IssuedataService {

    constructor(private http: HttpClient) {


    }

    getIssueHistoryData(posNum: Number, from: String, to: String, page: number, pageSize: number): Observable<any> {
        return this.http
        .get(`/api/issuehistory/all?posNum=${posNum}&from=${from}&to=${to}&page=${page}&pageSize=${pageSize}`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 获取指定类型的事件
    // getIssues(deviceType: number, state: number): Observable<any> {
    //     return this.http.get(`/api/issue/open?deviceType=${deviceType}&state=${state}`)
    //         .pipe(map((res) => {
    //             return res;
    //         }));
    // }

    // 获取指定设备的事件
    // getDeviceIssues(deviceId: number, state: number): Observable<any> {
    //     return this.http.get(`/api/issue/open?deviceId=${deviceId}&state=${state}`)
    //         .pipe(map((res) => {
    //             return res;
    //         }));
    // }


    // 获取指定设备类型的不同状态的统计
    // getStatus(deviceType: number, state: number, comment: string): Observable<any> {
    //     return this.http.post(`/api/issue/open/stat?deviceType=${deviceType}`, {
    //         'comment': comment,
    //         'state': state
    //     })
    //         .pipe(map((res) => {
    //             return res;
    //         }));
    // }
}
