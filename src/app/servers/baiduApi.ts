
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';



@Injectable()
export class BeiduAPIService {

    // private headers: any;
    constructor(private http: Http) {
        // this.headers = new Headers();

        // this.headers.append("Access-Control-Allow-Origin", "http://172.18.1.133:10001");

    }

    // 'http://api.map.baidu.com/location/ip?ip=&ak=MMOuEtslFs2yppwcggMudtBUtk8CbqnA&coor=bd09ll'
    getLocation(url: string): Observable<any[]> {

        return this.http.get(url)
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();

                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();

                }
            }));
    }


}
