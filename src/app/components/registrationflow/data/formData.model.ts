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

    trip1Id = '';
    trip1Name = '';
    trip2Id = '';
    trip2Name = '';
    trip3Id = '';
    trip3Name = '';

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

        this.trip1Id = '';
        this.trip2Id = '';
        this.trip3Id = '';

        this.trip1Name = '';
        this.trip2Name = '';
        this.trip3Name = '';
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
}

export class Trip {
    id = '';
    name = '';
}
