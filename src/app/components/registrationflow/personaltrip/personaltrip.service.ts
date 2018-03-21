import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PersonalTripService {
    _http: HttpClient;
    memberships: Membership[];
    accomodationTypes: AccomodationType[];

    constructor(http: HttpClient) {
        this._http = http;
        console.log('PersonalTrip service loaded');
    }

    getMemberships(): Observable<Membership[]> {
        return this._http.get('http://localhost:49223/api/values/Memberships').map((data: Membership[]) => {
            this.accomodationTypes = data;
            return data;
        });
    }

    getAccomodationTypes(): Observable<AccomodationType[]> {
        return this._http.get('http://localhost:49223/api/values/AccomodationTypes').map((data: AccomodationType[]) => {
            this.accomodationTypes = data;
            return data;
        });
    }
}

export interface Membership {
    id: number;
    name: string;
    enum: number;
}

export interface AccomodationType {
    id: number;
    name: string;
    enum: number;
}
