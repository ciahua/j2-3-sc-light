
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/';

import { HttpClient } from '@angular/common/http';
// import { Http, Headers, Response } from '@angular/http';

import { map } from 'rxjs/operators';


@Injectable()
export class MonitorService {

    constructor(private http: HttpClient) {


    }
    // 设备列表
    getDevice(): Observable<any> {
        return this.http.get('/api/device/type/all')
            .pipe(map((res: Response) => {
                return res;
            }));

    }

    // 城市列表
    getZoneDefault(): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get('/api/zone/default')
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 获取按区域汇总的位置数据
    getRegions(sw: any, ne: any, level: number, type: number): Observable<any> {
        return this.http.post(`/api/position/inbounds/sum/${level}`, {
            'bounds': {
                'ne': ne,
                'sw': sw
            },
            'device_type': type
        })
            .pipe(map((res: Response) => {
                return res;
            }));

    }

    // 获取策略表


    // 获取详细的位置数据
    getDetails(sw: any, ne: any, zoom: Number, type: Number): Observable<any> {
        return this.http.post('/api/position/inbounds/details', {
            'bounds': {
                'ne': ne,
                'sw': sw
            },
            'device_type': type
        })
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 获取详细的位置数据ByDeviceNumber
    getDetailsByDeviceNumber(number): Observable<any> {
        return this.http.post(`/api/position/inbounds/details/${number}`, {

        })
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 获取指定位置所挂设备参数定义
    getDeviceDetails(positionId: string, deviceType: Number, page, pageSize, queryStr): Observable<any> {
        return this.http.get(`/api/position/device?positionId=
        ${positionId}&deviceType=${deviceType}&page=${page}&pageSize=${pageSize}&queryStr=${queryStr}`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 获取指定位置所挂设备参数定义
    getDeviceDetailsAll(positionId: string, deviceType: Number): Observable<any> {
        return this.http.get(`/api/position/device?positionId=${positionId}&deviceType=${deviceType}`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }


    // 获取设备型号
    getModels(): Observable<any> {
        return this.http.get(`/api/device/model/all`)
            .pipe(
                map((res) => {
                    return res;
                },

                ));
    }

    // 获取设备信息
    getDeviceByName(name): Observable<any> {
        return this.http.get(`/api/device/getByName?name=${name}`)
            .pipe(
                map((res) => {
                    return res;
                },

                ));
    }



}
