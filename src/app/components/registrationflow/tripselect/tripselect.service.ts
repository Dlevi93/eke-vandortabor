import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../app/app.settings';

@Injectable()
export class TripSelectorService {
    _http: HttpClient;
    trips: TripApi[];
    trip: TripApi;

    constructor(http: HttpClient) {
        this._http = http;
        console.log('TripSelector service loaded');
    }

    getTrips(day: number): Observable<TripApi[]> {
        return this._http.get(AppSettings.API_ENDPOINT + '/Trips/' + day).map((data: TripApi[]) => {
            this.trips = data;
            return data;
        });
    }

    getTrip(id: number, day: number): Observable<TripApi> {
        return this._http.get(AppSettings.API_ENDPOINT + '/Trip/' + id + '/' + day).map((data: TripApi) => {
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
    time: number;
    price: number;
    age: string;
    elevation: string;
    category: TripCategoryApi;
    difficulty: TripDifficultyApi;
    attributes: TripAttributesApi[];
    spots: TripSpots;
    remainingSpots: TripSpots;
}

export interface TripCategoryApi {
    name: string;
    enum: string;
}

export interface TripDifficultyApi {
    name: string;
    enum: string;
}

export interface TripAttributesApi {
    name: string;
    enum: string;
}

export interface TripSpots {
    day: number;
    spots: number;
}
