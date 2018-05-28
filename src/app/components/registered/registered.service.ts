import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../app/app.settings';
import { RegisteredUser } from './registered.component';

@Injectable()
export class RegisteredService {
    constructor(private http: HttpClient) { }

    getRegisteredList() {
        return this.http.get(AppSettings.API_ENDPOINT + '/UserList')
            .toPromise()
            .then(res => <RegisteredUser[]>res)
            .then(data => data);
    }
}
