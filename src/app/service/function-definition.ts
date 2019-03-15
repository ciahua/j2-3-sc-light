
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';


@Injectable()
export class FunctionDefinitionService {

    constructor(private http: HttpClient) {
    }

    // 获取数据定义 /api/device/model/service/all
    getProperty(modelId): Observable<any> {
        return this.http.get(`/api/device/model/property/all?modelId=${modelId}`)
            .pipe(map((res) => {
                return res;
            }));
    }

    // 获取数据定义 /api/device/model/service/all
    getService(modelId): Observable<any> {
        return this.http.get(`/api/device/model/service/all?modelId=${modelId}`)
            .pipe(map((res) => {
                return res;
            }));
    }


    // 添加数据定义
    addProperty(body) {
        return this.http.post(`/api/device/model/property`, body)
            .pipe(map((res) => {
                return res;
            }));
    }

    // 修改数据定义
    updateProperty(body) {
        return this.http.put(`/api/device/model/property`, body)
            .pipe(map((res) => {
                return res;
            }));
    }

    // 删除数据定义 /api/device/model/property/{id}
    delProperty(id) {
        return this.http.delete(`/api/device/model/property/${id}`)
            .pipe(map((res) => {
                return res;
            }));
    }

    // 添加服务定义
    addService(body) {
        return this.http.post(`/api/device/model/service`, body)
            .pipe(map((res) => {
                return res;
            }));
    }

    // 修改服务定义 /api/device/model/property/{id}
    updateService(body) {
        return this.http.put(`/api/device/model/service`, body)
            .pipe(map((res) => {
                return res;
            }));
    }

    // 删除服务定义 /api/device/model/property/{id}
    delService(id) {
        return this.http.delete(`/api/device/model/service/${id}`)
            .pipe(map((res) => {
                return res;
            }));
    }
}
