import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InstallZoneService {
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

    // 获取所有安装区域
    getZone(page, pageSize, queryStr): Observable<any> {
    // return Observable.of(ARTICLESTYPE);

        return this.http.get(`/api/zone?page=${page}&pageSize=${pageSize}&queryStr=${queryStr}`)
        .pipe(map((res: Response) => {
            return res;
        }));
    }

    // 删除安装区域
    deleteInstall(body): Observable<any> {
        console.log(body);
        // const body1 = JSON.stringify(body);
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: body
        };

        return this.http.delete(`/api/zone`, httpOptions)
            .pipe(map((res: Response) => {
                const data = { status: 200};
                return data;
            }));
    }

    // 新增安装区域
    addNewInstall(body): Observable<any> {
        return this.http.post('/api/zone', body)
            .pipe(map((res: Response) => { // 相当于一种映射
                return res;
            }));
    }

    // 修改安装区域
    updateInstall(body): Observable<any> {
        return this.http.put('/api/zone', body)
            .pipe(map((res: Response) => { // 相当于一种映射
                return res;
            }));
    }
}

