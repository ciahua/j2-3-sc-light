
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'; // 1.引入HTTP模块
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';



@Injectable()
export class RoadService {
    public url: string;
    // 2.在组件的构造函数中实例化 HttpClient
    constructor(private http: HttpClient) {

    }

    // 添加道路
    addRoads(body): Observable<any> {
        return this.http.post(`/api/geo_way`, body)
            .pipe(
                map((res) => {
                    return res;
                },
                ));
    }

    // 修改道路
    updetaRoads(body): Observable<any> {
        return this.http.put(`/api/geo_way`, body)
            .pipe(
                map((res) => {
                    return res;
                },
                ));
    }
    // 删除道路
    delRoads(body): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: body
        };
        return this.http.delete(`/api/geo_way`, httpOptions)
            .pipe(
                map((res) => {
                    return res;
                },
                ));
    }

    // 分页获取道路
    getRoads(page, pageSize, queryStr): Observable<any> {


        return this.http.get(`api/geo_way/?page=${page}&pageSize=${pageSize}&queryStr=${queryStr}`)
            .pipe(
                map((res) => {
                    return res;
                },
                ));

    }

    // 获取孩子行政区域-
    getChildRegions(parentId, page, pageSize, queryStr): Observable<any> {
        return this.http.get(`/api/geo_region/children?page=${page}&pageSize=${pageSize}&parentId=${parentId}&queryStr=${queryStr}`)
            .pipe(
                map((res) => {
                    return res;
                },
                ));
    }

    // 获取行政区域
    getRegions(): Observable<any>  {
        return this.http.get(`/api/geo_region/all`)
            .pipe(
                map((res) => {
                    return res;
                },
                ));
    }
// 删除
    delRegions(body): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: body
        };
        return this.http.delete(`/api/geo_region`, httpOptions)
            .pipe(
                map((res) => {
                    return res;
                },
                ));
    }
// 新增

    addRegions(body): Observable<any> {

        return this.http.post(`/api/geo_region`, body)
            .pipe(
                map((res) => {
                    return res;
                },
                ));
    }

// 修改
    updetRegions(body): Observable<any> {

        return this.http.put(`/api/geo_region`, body)
            .pipe(
                map((res) => {
                    return res;
                },
                ));
    }



}
