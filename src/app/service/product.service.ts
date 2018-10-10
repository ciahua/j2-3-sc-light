
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';



@Injectable()
export class ProductService {
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

    // 获取设备型号
    getModel(queryStr: String, type: number, page: number, pagesize: number): Observable<any> {
        return this.http.get(`/api/device/model?queryStr=${queryStr}&type=${type}&page=${page}&pageSize=${pagesize}`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 新增设备型号
    setModel(name, description, type, isGateway): Observable<any> {
        return this.http.post(`/api/device/model`, {
            'name': name,
            'description': description,
            'type': type,
            'isGateway': isGateway,
        })
        .pipe(map((res: Response) => {
            return res;
        }));
    }

    // 修改设备型号
    updateModel(id, name, description, type, isGateway): Observable<any> {
        return this.http.put(`/api/device/model`, {
            'id': id,
            'name': name,
            'description': description,
            'type': type,
            'isGateway': isGateway
        })
            .pipe(map((res: Response) => {
                const data = { status: 200 };
                return data;
            }));
    }

    // 设备型号/api/position?id=1
    delModel(id) {
        return this.http.delete(`/api/device/model?id=${id}`)
            .pipe(map((res: Response) => {
                const data = { status: 200 };
                return data;
            }));
    }






}
