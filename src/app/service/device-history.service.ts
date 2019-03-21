
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // 1.引入HTTP模块
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';



@Injectable()
export class DeviceHistoryService {
    public url: string;
    // 2.在组件的构造函数中实例化 HttpClient
    constructor(private http: HttpClient) {

    }
    // 获取设备信息
    getDevice(deviceId): Observable<any> {
        return this.http.get(`/api/device/${deviceId}`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }


    // 获取设备实时数据
    getCurrentProperty(deviceId , page, pageSize): Observable<any> {
        return this.http.get(`/api/device/property/current/${deviceId}?page=${page}&pageSize=${pageSize}`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }
    // 获取设备历史数据
    getHistoryProperty(deviceId, page, pageSize, queryStr, fromdate, todate): Observable<any> {
        const url = 'api/device/property/history/';
        return this.http.get(`${url}${deviceId}?page=${page}&pageSize=${pageSize}&queryStr=${queryStr}&from=${fromdate}&to=${todate}`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 获取历史数据的统计值
    getStatistics(id: number, field: string, agg: string, from: string, to: string, interval: string) {
        return this.http
            .get(`api/device/property/stat/${id}/${field}/${agg}?from=${from}&to=${to}&interval=${interval}`)
            .pipe(map((res) => {
                return res;
            }));
    }
// 历史安装记录
    getHistory(userId, page, pageSize, queryStr, fromdate, todate): Observable<any> {
        let url = '';
        if (!userId) {
            url = `api/install?page=${page}&pageSize=${pageSize}&queryStr=${queryStr}&from=${fromdate}&to=${todate}`;
        } else {
            url = `api/install?userId=${userId}&page=${page}&pageSize=${pageSize}&queryStr=${queryStr}&from=${fromdate}&to=${todate}`;
        }

        return this.http.get(url)
            .pipe(
                map((res) => {
                    return res;
                },
                ));

    }

    // 设备上下线记录
    getlogs(userId, page, pageSize, queryStr, fromdate, todate): Observable<any> {
        let url = '';
        if (!userId) {
            url = `/api/device/online_log?page=${page}&pageSize=${pageSize}&queryStr=${queryStr}&from=${fromdate}&to=${todate}`;
        } else {
            url = `api/install?userId=${userId}&page=${page}&pageSize=${pageSize}&queryStr=${queryStr}&from=${fromdate}&to=${todate}`;
        }

        return this.http.get(url)
            .pipe(
                map((res) => {
                    return res;
                },
                ));

    }

    // 获取某个设备的所有服务调用
    getDeviceService(modelId): Observable<any> {
        return this.http.get(`/api/device/model/service/all?modelId=${modelId}`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 获取服务调用所需的参数
    getServeParam(serviceId): Observable<any> {
        return this.http.get(`/api/device/model/service/getServeParam?serviceId=${serviceId}`)
            .pipe(map((res: Response) => {
                console.log('res:' + res);
                return res;
            }));
    }

    // 服务调用
    addInvokeService(body) {
        console.log('body: ' + body.args + 'deviceName ' + body.deviceName );
        return this.http.post(`/api/device/model/service/invokeService`, body)
            .pipe(map((res) => {
                console.log('res: ' + res);
                return res;
            }));
    }
}
