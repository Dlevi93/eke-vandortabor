import { TripApi } from '../tripselect/tripselect.service';

export class FormData {
    firstName = '';
    lastName = '';
    email = '';
    birthDate = '';
    city = '';
    country = '';
    phoneno = '';
    cnp = '';
    member = '';
    accomodation = '';
    carNo = '';
    tagNo = '';
    notes = '';

    trip1: TripApi;
    trip2: TripApi;
    trip3: TripApi;
    activeTrip: TripApi;

    clear() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.birthDate = '';
        this.city = '';
        this.country = '';
        this.phoneno = '';
        this.cnp = '';
        this.member = '';
        this.accomodation = '';
        this.carNo = '';
        this.tagNo = '';
        this.notes = '';

        this.trip1 = null;
        this.trip2 = null;
        this.trip3 = null;
        this.activeTrip = null;
    }
}

export class Personal {
    firstName = '';
    lastName = '';
    email = '';
    birthDate = '';
    city = '';
    country = '';
    phoneno = '';
    cnp = '';
    member = '';
    accomodation = '';
    carNo = '';
    tagNo = '';
    notes = '';

    trip1: TripApi;
    trip2: TripApi;
    trip3: TripApi;
    activeTrip: TripApi;
}
