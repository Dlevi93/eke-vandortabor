import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    providers: [AdminService],
})

export class AdminComponent implements OnInit {
    users: AdminUser[];
    cols: any[];

    constructor(private registeredService: AdminService, private spinnerService: Ng4LoadingSpinnerService) { }

    ngOnInit() {
        this.spinnerService.show();
        this.registeredService.getRegisteredList().then(users => { this.users = users; this.spinnerService.hide(); });
    }
}

export class AdminUser {
    firstName = '';
    lastName = '';
    city = '';
    member = '';
    trips = '';
}
