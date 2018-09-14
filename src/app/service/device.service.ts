
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';



@Injectable()
export class DeviceService {
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

                    console.log(data.regions[0]);
                    data.regions[0].open = true;
                    // data.regions[0].children[0].open = true;
                    // data.regions[0].children.map((item, index) => {
                    //     data.regions[0].children[index].open = true;
                    // });

                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();

                }
            }));
    }

    // 获取所有设备-分页
    getAllDevice(page: number, pageSize: number): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get(`/api/device?page=${page}&pageSize=${pageSize}`)
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();
                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();
                }
            }));
    }

    // 获取所有设备型号-分页
    getAllDeviceModel(type: number, page: number, pageSize: number): Observable<any> {
        return this.http.get(`/api/device/model?type=${type}&page=${page}&pageSize=${pageSize}`)
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();
                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();
                }
            }));
    }

    // 新增设备
    addNewDevice(name: String, modelId: Number, descr: String, lng: Number, lat: Number): Observable<any> {
        return this.http.post('/api/device', {
            'name': name,
            'modelId': modelId,
            'description': descr,
            'point': {
                'lat': lat,
                'lng': lng
            }
        })
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();
                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();
                }
            }));
    }

    // 删除设备
    delDevice(id) {
        return this.http.delete(`/api/device?id=${id}`)
            .pipe(map((res: Response) => {
                if (res.status === 200) {

                    const data = { status: 200};
                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();

                }
            }));
    }

    // 修改设备
    updateDevice(name: String, modelId: Number, descr: String, lng: Number, lat: Number): Observable<any> {
        return this.http.put(`/api/position`, {
            'name': name,
            'modelId': modelId,
            'description': descr,
            'point': {
                'lat': lat,
                'lng': lng
            }
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
