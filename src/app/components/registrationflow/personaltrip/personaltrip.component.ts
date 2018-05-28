import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { FormDataService } from '../data/formData.service';
import { Personal } from '../data/formData.model';
import { PersonalTripService } from './personaltrip.service';
import { Membership } from './personaltrip.service';
import { AccomodationType } from './personaltrip.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SelectItem } from 'primeng/api';

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
    dayOnlySelectedList: SelectItem[];

    selectedValueMembership: Membership;
    selectedAccomodationTypes: AccomodationType;

    personal: Personal;
    form: any;

    kidInFamily: boolean;
    dayOnlySelected: boolean;

    constructor(private router: Router, private formDataService: FormDataService, private personalTripService: PersonalTripService,
        private spinnerService: Ng4LoadingSpinnerService) {
    }

    ngOnInit() {
        this.spinnerService.show();
        this.personal = this.formDataService.getPersonal();
        this.personalTripService.getMemberships().subscribe(result => { this.memberships = result; this.spinnerService.hide(); });
        // tslint:disable-next-line:max-line-length
        this.personalTripService.getAccomodationTypes().subscribe(result => { this.accomodationTypes = result; this.spinnerService.hide(); });

        this.dayOnlySelectedList = [
            { label: 'Kedd', value: 'Kedd' },
            { label: 'Szerda', value: 'Szerda' },
            { label: 'Csütörtök', value: 'Csütörtök' },
        ];

        console.log('Personal trip feature loaded!');

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

    changePaymentCategory(value: Membership, birthDate: Date) {
        console.log('PaymentCategory changed');

        const date = new Date('2018-7-30');
        let year = date.getFullYear() - birthDate.getFullYear();
        const month = date.getMonth() - birthDate.getMonth();
        const day = date.getDate() - birthDate.getDate();

        if (month < 0) {
            year--;
        } else if (month === 0) {
            if (day < 0) {
                year--;
            }
        }

        if (value.enum === 0) {
            this.personal.tagNo = '';
            if (year > 23) {
                this.personal.paymentCategory = '0';
            } else if (year > 6 && year < 13) {
                this.personal.paymentCategory = '3';
            } else if (year > 12 && year < 24) {
                this.personal.paymentCategory = '5';
            }
        } else {
            if (year > 23) {
                this.personal.paymentCategory = '1';
            } else if (year > 6 && year < 13) {
                this.personal.paymentCategory = '4';
            } else if (year > 12 && year < 24) {
                this.personal.paymentCategory = '6';
            }
        }

        if (this.dayOnlySelected) {
            this.personal.paymentCategory = '8';
        }

        if (year < 7) {
            this.personal.paymentCategory = '2';
        }

        if (this.kidInFamily) {
            this.personal.paymentCategory = '7';
        }

        console.log(this.personal.paymentCategory);
    }

    changeKidInFamily() {
        console.log('KidInFamily changed');
        if (this.kidInFamily) {
            this.personal.paymentCategory = '7';
            console.log(this.personal.paymentCategory);
        } else {
            const membership: Membership = this.personal.member as any;
            const birthDate: Date = this.personal.birthDate as any;
            this.changePaymentCategory(membership, birthDate);
        }
    }

    changeDayOnlyBoolSelected() {
        if (!this.dayOnlySelected) {
            // this.personal.dayOnlySelected = '';
            const membership: Membership = this.personal.member as any;
            const birthDate: Date = this.personal.birthDate as any;
            this.changePaymentCategory(membership, birthDate);
        }
    }

    changeDayOnlySelected() {
        console.log('DayOnlySelected changed');

        if (this.dayOnlySelected) {
            this.personal.paymentCategory = '8';
        }

        console.log(this.personal.dayOnlySelected);
        console.log(this.personal.paymentCategory);
    }
}
