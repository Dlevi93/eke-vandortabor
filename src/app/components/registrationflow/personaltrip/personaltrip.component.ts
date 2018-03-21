import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { FormDataService } from '../data/formData.service';
import { SelectItem } from 'primeng/api';
import { PersonalTripService } from './personaltrip.service';
import { Membership } from './personaltrip.service';
import { AccomodationType } from './personaltrip.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'mt-wizard-personaltrip',
    templateUrl: './personaltrip.component.html',
    styleUrls: ['./personaltrip.component.css'],
    providers: [PersonalTripService]
})

export class PersonalTripComponent implements OnInit {
    memberships: Membership[];
    accomodationTypes: AccomodationType[];

    selectedValueMembership: Membership;
    selectedAccomodationTypes: AccomodationType;

    workType: string;
    form: any;

    constructor(private router: Router, private formDataService: FormDataService, private personalTripService: PersonalTripService) {
    }

    ngOnInit() {
        this.workType = this.formDataService.getWork();
        this.personalTripService.getMemberships().subscribe(result => this.memberships = result);
        this.personalTripService.getAccomodationTypes().subscribe(result => this.accomodationTypes = result);
        console.log('Personal trip feature loaded!');
    }

    save(form: any): boolean {
        if (!form.valid) {
            return false;
        }

        this.formDataService.setWork(this.workType);
        return true;
    }

    goToPrevious(form: any) {
        if (this.save(form)) {
            // Navigate to the personal page
            this.router.navigate(['registration/personal']);
        }
    }

    goToNext(form: any) {
        if (this.save(form)) {
            // Navigate to the address page
            this.router.navigate(['registration/address']);
        }
    }
}
