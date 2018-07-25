import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../app/app.settings';
import { AdminUser } from './admin.component';

@Injectable()
export class AdminService {
    constructor(private http: HttpClient) { }

    getRegisteredList() {
        return this.http.get(AppSettings.API_ENDPOINT + '/UserListToTb')
            .toPromise()
            .then(res => <AdminUser[]>res)
            .then(data => data);
    }
}