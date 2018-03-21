export class FormData {
    firstName = '';
    lastName = '';
    email = '';
    birthDate = '';
    city = '';
    country = '';
    phoneno = '';
    cnp = '';

    work = '';
    street = '';
    state = '';
    zip = '';


    clear() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.birthDate = '';
        this.city = '';
        this.country = '';
        this.phoneno = '';
        this.cnp = '';

        this.work = '';
        this.street = '';
        this.state = '';
        this.zip = '';
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
}

export class Address {
    street = '';
    state = '';
    zip = '';
}
