
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';



@Injectable()
export class PositionService {
    public url: string;
    constructor(private http: HttpClient) {

    }
    // 城市列表
    getZoneDefault(...cusid): Observable<any> {
        // return Observable.of(ARTICLESTYPE);
        // console.log(cusid);
        // console.log(typeof cusid);
        const url = cusid && cusid[0] ? `/api/zone/default?cusid=${cusid}` : `/api/zone/default`;


        return this.http.get(url)
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 设备列表
    getPositionType(): Observable<any> {
        return this.http.get('/api/position/type')
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

// 新增
    setPosition(body): Observable<any> {
        return this.http.post(`/api/position`, body)
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
    updataPosition(body): Observable<any> {
        return this.http.put(`/api/position`, body)
            .pipe(map((res: Response) => {
                const data = { status: 200 };
                return data;
            }));
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

    // 获取所有Customer
    getCustomer(page, pageSize, queryStr): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get(`/api/customer?page=${page}&pageSize=${pageSize}&queryStr=${queryStr}`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }





}
