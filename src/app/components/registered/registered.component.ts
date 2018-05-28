import { Component, OnInit } from '@angular/core';
import { RegisteredService } from './registered.service';
import { Personal } from '../registrationflow/data/formData.model';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'registered',
    templateUrl: './registered.component.html',
    styleUrls: ['./registered.component.css'],
})

export class RegisteredComponent implements OnInit {
    users: RegisteredUser[];

    constructor(private registeredService: RegisteredService, private spinnerService: Ng4LoadingSpinnerService) { }

    ngOnInit() {
        this.spinnerService.show();
        this.registeredService.getRegisteredList().then(users => { this.users = users; this.spinnerService.hide(); });
    }
}

export class RegisteredUser {
    firstName = '';
    lastName = '';
    city = '';
    member = '';
    trips = '';
}
