
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';



@Injectable()
export class AdminService {
    public url: string;
    constructor(private http: Http) {

    }

    // 获取所有用户 - 分页
    getAllUser(queryStr: String, page: number, pageSize: number): Observable<any> {
        // return Observable.of(ARTICLESTYPE);

        return this.http.get(`/security/user?queryStr=${queryStr}&page=${page}&pageSize=${pageSize}`)
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();
                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();
                }
            }));
    }

    // 新增用户
    addNewUser(name: String, password: String, gender: number, avatarUrl: String, email: String,
        mobile: String, fullName: String, nickName: String, roleIds: any): Observable<any> {
        return this.http.post('/security/user', {
            'userName': name,
            'password': password,
            'gender': gender,
            'avatarurl': avatarUrl,
            'email': email,
            'mobile': mobile,
            'fullName': fullName,
            'nickName': nickName,
            'roles': roleIds
        })
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();
                    return data;
                } else if (res.status === 400) {
                    return res.json();
                }
            }));
    }
    // 修改用户
    updateUser(id: number, name: String, password: String, gender: number, avatarUrl: String, email: String,
        mobile: String, fullName: String, nickName: String, roleIds: any): Observable<any> {
        return this.http.put('/security/user', {
            'id': id,
            'userName': name,
            'password': password,
            'gender': gender,
            'avatarurl': avatarUrl,
            'email': email,
            'mobile': mobile,
            'fullName': fullName,
            'nickName': nickName,
            'roles': roleIds
        })
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = {status: 200};
                    return data;
                } else if (res.status === 400) {
                    return res.json();
                }
            }));
    }

    // 删除用户
    deleteUser(id) {
        return this.http.delete(`/security/user?id=${id}`)
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = { status: 200};
                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();
                }
            }));
    }

    // 获取所有角色
    getAllRole(): Observable<any> {
        return this.http.get(`/security/role/all`)
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
