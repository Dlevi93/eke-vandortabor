import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { FormDataService } from '../data/formData.service';
import { Personal } from '../data/formData.model';
import { PersonalTripService } from './personaltrip.service';
import { Membership } from './personaltrip.service';
import { AccomodationType } from './personaltrip.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'mt-wizard-personaltrip',
    templateUrl: './personaltrip.component.html',
    styleUrls: ['./personaltrip.component.css'],
    providers: [PersonalTripService],
})

export class PersonalTripComponent implements OnInit {
    memberships: Membership[];
    accomodationTypes: AccomodationType[];

    selectedValueMembership: Membership;
    selectedAccomodationTypes: AccomodationType;

    personal: Personal;
    form: any;

    constructor(private router: Router, private formDataService: FormDataService, private personalTripService: PersonalTripService,
        private spinnerService: Ng4LoadingSpinnerService) {
    }

    ngOnInit() {
        this.spinnerService.show();
        this.personal = this.formDataService.getPersonal();
        this.personalTripService.getMemberships().subscribe(result => this.memberships = result);
        this.personalTripService.getAccomodationTypes().subscribe(result => this.accomodationTypes = result);
        console.log('Personal trip feature loaded!');
        this.spinnerService.hide();
    }

    save(form: any, backNav: boolean): boolean {
        if (!form.valid && !backNav) {
            return false;
        }

        this.formDataService.setPersonalTrip(this.personal);
        return true;
    }

    goToPrevious(form: any) {
        if (this.save(form, true)) {
            // Navigate to the personal page
            this.router.navigate(['registration/personal']);
        }
    }

    goToNext(form: any) {
        if (this.save(form, false)) {
            // Navigate to the address page
            this.router.navigate(['registration/tripselect/1']);
        }
    }

    checkAccomodationValue(value: AccomodationType) {
        if (value.id === 3) { return false; }
        return true;
    }

    checkMembershipValue(value: Membership) {
        if (value.id === 1) { return true; }
        return false;
    }
}
