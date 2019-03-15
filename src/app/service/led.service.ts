
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';




@Injectable()
export class LedService {
    public url: string;
    constructor(private http: HttpClient) {

    }
    gFiles(id): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get(`/led-api/files/gFiles?id=${id}`)
            .pipe(map((res: Response) => {
                return res;
            }));


    }

    createAir(): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get(`/led-api/files/createAir`)
            .pipe(map((res: Response) => {
                return res;
            }));


    }



    delProgram(id): Observable<any>  {
        return this.http.delete(`/led-api/programs/delProgram?id=${id}`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    getProgram(id): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get(`/led-api/programs/getProgram?id=${id}`)
            .pipe(map((res: Response) => {
                return res;
            }));


    }
    createProgram(body): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.post('/led-api/programs/createProgram', body)
            .pipe(map((res: Response) => {
                return res;
            }));


    }

    getPrograms(currentPage, pageSize): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http
        .get(`/led-api/programs/getPrograms?pageSize=${pageSize}&currentPage=${currentPage}&timestamp=${new Date().getTime()}`)
            .pipe(map((res: Response) => {
                return res;
            }));


    }

    delTask(id): Observable<any> {
        return this.http.delete(`/led-api/tasks/delTask?id=${id}`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }
    createTask(body): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.post('/led-api/tasks/createTask', body)
            .pipe(map((res: Response) => {
                return res;
            }));


    }

    getTasks(currentPage, pageSize): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get(`/led-api/tasks/getTasks?pageSize=${pageSize}&currentPage=${currentPage}&timestamp=${new Date().getTime()}`)
            .pipe(map((res: Response) => {
                return res;
            }));


    }





    createUser(body): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.post('/led-api/users/createUser', body)
            .pipe(map((res: Response) => {
                return res;
            }));


    }

    getUsers(currentPage, pageSize): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get(`/led-api/users/getUser?pageSize=${pageSize}&currentPage=${currentPage}`)
            .pipe(map((res: Response) => {
                return res;
            }));


    }







}
