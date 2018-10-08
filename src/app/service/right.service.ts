
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';



@Injectable()
export class RightService {
    public url: string;
    constructor(private http: Http) {

    }

    // 获取所有角色 - 分页
    getAllRole(queryStr: String, page: Number, pageSize: Number): Observable<any> {
        return this.http.get(`/security/role?queryStr=${queryStr}&page=${page}&pageSize=${pageSize}`)
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = res.json();
                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();
                }
            }));
    }

    // 新增角色
    addNewRole(name: String): Observable<any> {
        return this.http.post('/security/role', {
            'name': name
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
    // 修改角色
    updateRole(id: String, name: String): Observable<any> {
        return this.http.put('/security/role', {
            'id': id,
            'name': name
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
    deleteRole(id) {
        return this.http.delete(`/security/role?id=${id}`)
            .pipe(map((res: Response) => {
                if (res.status === 200) {
                    const data = { status: 200};
                    return data;
                } else if (res.status === 202) {
                    return res.json().code.toString();
                }
            }));
    }



}
