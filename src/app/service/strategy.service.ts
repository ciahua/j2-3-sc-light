
import {  Injectable} from '@angular/core';
import { Observable } from 'rxjs/';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';


@Injectable()
export class StrategyService {

    constructor(private http: HttpClient) {
    }
    // 获取策略表
    getStrategy(): Observable<any> {
        return this.http.get(`/api/streetlight/rule`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }
    // 新增策略
    addStrategy(name: string): Observable<any> {
        return this.http.post(`/api/streetlight/rule`, {
            'name': name
        })
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 修改策略
    updateStrategy(id: number, name: string): Observable<any> {
        return this.http.put(`/api/streetlight/rule`, {
            'id': id,
            'name': name
        })
            .pipe(map((res: Response) => {
                const data = { status: 200 };
                return data;
            }));
    }

    // 删除策略
    delStrategy(id: number): Observable<any> {
        return this.http.delete(`/api/streetlight/rule?id=${id}`)
            .pipe(map((res: Response) => {
                const data = { status: 200 };
                return data;
            }));
    }
    // 获取指定策略的规则
    getRules(ruleId: number): Observable<any> {
        return this.http.get(`/api/streetlight/rule/${ruleId}`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 新增策略的日期规则
    addRules(ruleId: number, start: any, end: any, workdayRules: any, holidayRules: any): Observable<any> {
        return this.http.post(`/api/streetlight/rule/${ruleId}`, {
            'start': start,
            'end': end,
            'holidayRules': holidayRules,
            'workdayRules': workdayRules

        })
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 更新策略的日期规则
    updataRules(ruleId: number, ruleDateId: number, start: any, end: any, workdayRules: any, holidayRules: any): Observable<any> {
        return this.http.put(`/api/streetlight/rule/${ruleId}`, {
            'start': start,
            'end': end,
            'id': ruleDateId,
            'holidayRules': holidayRules,
            'workdayRules': workdayRules

        })
            .pipe(map((res: Response) => {
                const data = { status: 200 };
                return data;
            }));
    }

    // 删除策略的日期规则
    delRule(ruleId: number, ruleDateId: number): Observable<any> {
        return this.http.delete(`/api/streetlight/rule/${ruleId}?ruleDateId=${ruleDateId}`)
            .pipe(map((res: Response) => {
                const data = { status: 200 };
                return data;
            }));
    }

    // 策略范围

    // 城市列表
    getZoneDefault(): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get('/api/zone/default')
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 获取指定安装在区域内的路灯
    getRegionLights(regionId: number, page: number, pageSize: number): Observable<any> {
        return this.http.get(`/api/streetlight/region/${regionId}?page=${page}&pageSize=${pageSize}`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 获取策略覆盖区域
    getRegion(ruleId: number): Observable<any> {
        return this.http.get(`/api/streetlight/rule/${ruleId}/region`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 设置策略覆盖区域
    // [
    //     {
    //         'allDevices': true,
    //         'deviceIds': [
    //             0
    //         ],
    //         'regionId': 'string'
    //     }
    // ]
    setRegion(ruleId: number, body: any): Observable<any> {
        return this.http.put(`/api/streetlight/rule/${ruleId}/region`, body)
            .pipe(map((res: Response) => {
                const data = { status: 200 };
                return data;
            }));
    }
    // 获取策略覆盖区域
    getZtreeRegion(ruleId: number): Observable<any> {
        return this.http.get(`/api/streetlight/rule/${ruleId}/region`)
            .pipe(map((res: Response) => {
                return res;
                // const data = res.json();
                // return data;
            }));
    }
}
