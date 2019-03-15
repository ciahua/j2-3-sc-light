import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
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

    // 获取行政区域
    getRegions(): Observable<any> {
        return this.http.get(`/api/geo_region/all`)
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

    // 删除Customer
    deleteCustomer(id): Observable<any> {

        // const httpOptions = {
        //     headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: body
        // };

        return this.http.delete(`/api/customer?id=${id}`)
            .pipe(map((res: Response) => {
                const data = { status: 200 };
                return data;
            }));
    }

    // 新增Customer
    addNewCustomer(body): Observable<any> {
        return this.http.post('/api/customer', body)
            .pipe(map((res: Response) => { // 相当于一种映射
                return res;
            }));
    }

    // 修改Customer
    updateCustomer(body): Observable<any> {
        return this.http.put('/api/customer', body)
            .pipe(map((res: Response) => { // 相当于一种映射
                return res;
            }));
    }
}

