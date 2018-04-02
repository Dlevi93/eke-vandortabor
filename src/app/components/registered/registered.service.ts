import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personal } from '../registrationflow/data/formData.model';
import { AppSettings } from '../app/app.settings';

@Injectable()
export class RegisteredService {
    constructor(private http: HttpClient) { }

    getRegisteredList() {
        return this.http.get(AppSettings.API_ENDPOINT + '/UserList')
            .toPromise()
            .then(res => <Personal[]>res)
            .then(data => data);
    }
}
