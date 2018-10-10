
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/';
// import { of } from 'rxjs/';
import { map } from 'rxjs/operators';




@Injectable()
export class LedService {
    public url: string;
    constructor(private http: Http) {

    }
    gFiles(id): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get(`/led-api/files/gFiles?id=${id}`)
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

    createTask(body): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.post('/led-api/tasks/createTask', body)
            .pipe(map((res: Response) => {
                return res;
            }));


    }

    getTasks(currentPage, pageSize): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get(`/led-api/tasks/getTasks?pageSize=${pageSize}&currentPage=${currentPage}`)
            .pipe(map((res: Response) => {
                return res;
            }));


    }
    searchAllTask(id, currentPage, pageSize): Observable<any> {
        return this.http.get(`/led-api/tasks/searchAllTask?id=${id}&pageSize=${pageSize}&currentPage=${currentPage}`)
            .pipe(map((res: Response) => {
                return res;
            }));

}

    searchTask(body): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.post('/led-api/tasks/searchTask', body)
            .pipe(map((res: Response) => {
                return res;
            }));


    }

    createMedia(body): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.post('/led-api/medias/createMedia', body)
            .pipe(map((res: Response) => {
                return res;
            }));


    }
    getMedias(currentPage, pageSize): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get(`/led-api/medias/getMedia?pageSize=${pageSize}&currentPage=${currentPage}`)
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

        return this.http.get(`/led-api/programs/getPrograms?pageSize=${pageSize}&currentPage=${currentPage}`)
            .pipe(map((res: Response) => {
                return res;
            }));


    }







}
