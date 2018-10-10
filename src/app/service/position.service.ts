
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';



@Injectable()
export class PositionService {
    public url: string;
    constructor(private http: HttpClient) {

    }
    // 城市列表
    getZoneDefault(): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get('/api/zone/default')
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 设备列表
    getDevice(): Observable<any> {
        return this.http.get('/api/device/type/all')
            .pipe(map((res: Response) => {
                return res;
            }));

    }

    // 获取位置分页

    getPosition(queryStr: String, type: number, page: number, pagesize: number): Observable<any> {
        return this.http.get(`/api/position?queryStr=${queryStr}&type=${type}&page=${page}&pageSize=${pagesize}`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 新增位置信息

//     {
//     "id": 0,
//         "installZoneId": 0,
//             "name": "string",
//                 "number": "string",
//                     "point": {
//         "lat": 0,
//             "lng": 0
//     },
//     "regionId": "string",
//      "type": 0
// }
    setPosition(installZoneId, regionId, name, number, point, type): Observable<any> {
        return this.http.post(`/api/position`, {
            'installZoneId': installZoneId,
            'name': name,
            'number': number,
            'point': point,
            'regionId': regionId,
            'type': type
        })
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 删除位置 /api/position?id=1
    delPosition(id) {
        return this.http.delete(`/api/position?id=${id}`)
            .pipe(map((res: Response) => {
                const data = { status: 200};
                return data;
            }));
    }

    // 修改位置
    updataPosition(id, installZoneId, regionId, name, number, point, type): Observable<any> {
        return this.http.put(`/api/position`, {
            'id': id,
            'installZoneId': installZoneId,
            'name': name,
            'number': number,
            'point': point,
            'regionId': regionId,
            'type': type
        })
            .pipe(map((res: Response) => {
                const data = { status: 200 };
                return data;
            }));
    }




}
