
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';

import { HttpClient } from '@angular/common/http';


import { map } from 'rxjs/operators';


@Injectable()
export class CoverService {

    constructor(private http: HttpClient) {


    }


    // 获取详细的位置数据
    getCovers( ne: any, sw: any): Observable<any> {
        return this.http.post('/api/manhole/inbounds', {

            'ne': ne,
            'sw': sw

        })
            .pipe(map((res) => {
                return res;
            }));
    }

    // 获取指定类型的事件
    getIssues(deviceType: number, state: number): Observable<any> {
        return this.http.get(`/api/issue/open?deviceType=${deviceType}&state=${state}`)
            .pipe(map((res) => {
                return res;
            }));
    }
   

    // 获取指定设备的事件
    getDeviceIssues(deviceId: number, state: number): Observable<any> {
        return this.http.get(`/api/issue/open?deviceId=${deviceId}&state=${state}`)
            .pipe(map((res) => {
                return res;
            }));
    }

    // 设置指定事件状态0-1
    setIssues(issueId: number, state: number, comment: string): Observable<any> {
        return this.http.post(`/api/issue/${issueId}/state`, {
            'comment': comment,
            'state': state
        })
            .pipe(map((res) => {
                const data = { status: 200 };
                return data;
            }));
    }


    // 设置指定设备事件状态
    setDeviceIssues(deviceId: number, orgState: number, state: number, comment: string,
        assigneeId: string): Observable<any> {
        return this.http.post(`/api/issue/state?deviceId=${deviceId}`, {
            'comment': comment,
            'orgState': orgState,
            'state': state,
            'assigneeId': assigneeId
        })
            .pipe(map((res) => {
                const data = { status: 200 };
                return data;
            }));
    }

    // 获取指定设备类型的不同状态的统计

    getStatus(deviceType: number, state: number, comment: string): Observable<any> {
        return this.http.post(`/api/issue/open/stat?deviceType=${deviceType}`, {
            'comment': comment,
            'state': state
        })
            .pipe(map((res) => {
                return res;
            }));
    }

    // 获取所有用户 - 分页
    getAllUser(): Observable<any> {
        return this.http.get(`/security/user/all`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }
}
