
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AdminService {
    public url: string;
    constructor(private http: HttpClient) {

    }

    // 获取所有用户 - 分页
    getAllUser(queryStr: String, page: number, pageSize: number): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get(`/security/user?queryStr=${queryStr}&page=${page}&pageSize=${pageSize}`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 新增用户
    addNewUser(body): Observable<any> {
        return this.http.post('/security/user', body)
            .pipe(map((res: Response) => {
                return res;

            }));
    }
    // 修改用户
    updateUser(body): Observable<any> {
        return this.http.put('/security/user', body)
            .pipe(map((res: Response) => {
                const data = { status: 200 };
                return data;
            }));
    }

    // 删除用户
    deleteUser(id) {
        return this.http.delete(`/security/user?id=${id}`)
            .pipe(map((res: Response) => {
                const data = { status: 200 };
                return data;

            }));
    }

    // 获取所有角色
    getAllRole(): Observable<any> {
        return this.http.get(`/security/role/all`)
            .pipe(map((res: Response) => {
                return res;

            }));
    }

}
