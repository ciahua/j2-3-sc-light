
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';



@Injectable()
export class VideoService {
    public url: string;
    constructor(private http: Http) {

    }
    //  政策新闻
    getZoneDefault(): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get('/api/zone/default')
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();
                    console.log(data);
                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();

                }
            }));
    }




}
