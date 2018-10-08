
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';



@Injectable()
export class PositionService {
    public url: string;
    constructor(private http: Http) {

    }
    // 城市列表
    getZoneDefault(): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get('/api/zone/default')
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();
                    data.regions[0].open = true;

                    return data;
                } else  {
                    return res.json().code.toString();

                }
            }));
    }

    // 设备列表
    getDevice(): Observable<any> {
        return this.http.get('/api/device/type/all')
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();
                    return data;
                } else {
                    return res.json().code.toString();

                }
            }));

    }

    // 获取位置分页

    getPosition(queryStr: String, type: number, page: number, pagesize: number): Observable<any> {
        return this.http.get(`/api/position?queryStr=${queryStr}&type=${type}&page=${page}&pageSize=${pagesize}`)
            .pipe(map((res: Response) => {
                if (res.status === 200) {

                    const data = res.json();
                    return data;
                } else  {
                    return res.json().code.toString();

                }
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
                if (res.status === 200) {

                    const data = res.json();
                    return data;
                } else {
                    return res.json().code.toString();

                }
            }));
    }

    // 删除位置 /api/position?id=1
    delPosition(id) {
        return this.http.delete(`/api/position?id=${id}`)
            .pipe(map((res: Response) => {
                if (res.status === 200) {

                    const data = { status: 200};
                    return data;
                } else {
                    return res.json().code.toString();

                }
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
                if (res.status === 200) {

                    const data = { status: 200 };
                    return data;
                } else {
                    return res.json().code.toString();

                }
            }));
    }




}
