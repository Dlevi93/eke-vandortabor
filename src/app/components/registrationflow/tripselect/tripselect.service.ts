import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TripSelectorService {
    _http: HttpClient;
    trips: TripApi[];
    trip: TripApi;

    constructor(http: HttpClient) {
        this._http = http;
        console.log('TripSelector service loaded');
    }

    getTrips(): Observable<TripApi[]> {
        return this._http.get('http://localhost:49223/api/values/Trips').map((data: TripApi[]) => {
            this.trips = data;
            return data;
        });
    }

    getTrip(id: number): Observable<TripApi> {
        return this._http.get('http://localhost:49223/api/values/Trip/' + id).map((data: TripApi) => {
            this.trip = data;
            return data;
        });
    }
}

export interface TripApi {
    id: number;
    name: string;
    description: string;
    length: number;
    price: number;
    category: TripCategoryApi;
    difficulty: TripDifficultyApi;
    attributes: TripAttributesApi[];
}

export interface TripCategoryApi {
    name: string;
    enum: number;
}

export interface TripDifficultyApi {
    name: string;
    enum: number;
}

export interface TripAttributesApi {
    name: string;
    enum: number;
}
