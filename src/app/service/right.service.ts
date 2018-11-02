
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class RightService {
    public url: string;
    constructor(private http: HttpClient) {

    }

    // 获取所有角色 - 分页
    getAllRole(queryStr: String, page: Number, pageSize: Number): Observable<any> {
        return this.http.get(`/security/role?queryStr=${queryStr}&page=${page}&pageSize=${pageSize}`)
            .pipe(map((res: Response) => {
                return res;
            }));
    }

    // 新增角色
    addNewRole(name: String): Observable<any> {
        return this.http.post('/security/role', {
            'name': name
        })
            .pipe(map((res: Response) => {
                return res;
            }));
    }
    // 修改角色
    updateRole(id: String, name: String): Observable<any> {
        return this.http.put('/security/role', {
            'id': id,
            'name': name
        })
            .pipe(map((res: Response) => {
                const data = {status: 200};
                return data;
            }));
    }

    // 删除用户
    deleteRole(id) {
        return this.http.delete(`/security/role?id=${id}`)
            .pipe(map((res: Response) => {
                const data = { status: 200};
                return data;
            }));
    }



}
