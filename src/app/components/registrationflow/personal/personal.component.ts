import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Personal } from '../data/formData.model';
import { FormDataService } from '../data/formData.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'mt-wizard-personal',
    templateUrl: './personal.component.html',
})

export class PersonalComponent implements OnInit {
    minDate: Date = new Date(1900);
    personal: Personal;
    form: any;

    constructor(private router: Router, private formDataService: FormDataService) {
    }

    ngOnInit() {
        const dateNow = new Date();
        const dateThen = new Date('2018-07-24');
        if (dateNow > dateThen) {
            this.router.navigate(['/']);
        }

        this.personal = this.formDataService.getPersonal();
        console.log('Personal feature loaded!');
    }

    save(form: any): boolean {
        if (!form.valid) {
            return false;
        }

        this.formDataService.setPersonal(this.personal);
        return true;
    }

    goToNext(form: any) {
        if (this.save(form)) {
            // Navigate to the work page
            this.router.navigate(['registration/pstrip']);
        }
    }
}
