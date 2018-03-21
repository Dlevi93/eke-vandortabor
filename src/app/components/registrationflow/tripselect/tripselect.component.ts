import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Trip } from '../data/formData.model';
import { FormDataService } from '../data/formData.service';
import { TripSelectorService, TripApi } from './tripselect.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'mt-wizard-tripselect',
    templateUrl: './tripselect.component.html',
    providers: [ TripSelectorService ],
})

export class TripSelectComponent implements OnInit, OnDestroy {
    filledTrip: Trip;
    form: any;

    public id: number;
    private sub: any;

    tripList: TripApi[];

    constructor(private router: Router, private formDataService: FormDataService, private activatedRoute: ActivatedRoute,
                private tripSelectorService: TripSelectorService) {
    }

    ngOnInit() {
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.id = + params['id'];
        });

        this.filledTrip = this.formDataService.getTrip(this.id);
        this.tripSelectorService.getTrips().subscribe(result => this.tripList = result);
        console.log('Tripselect feature loaded!');
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    save(form: any): boolean {
        if (!form.valid) {
            return false;
        }

        this.formDataService.setTrip(this.filledTrip, this.id);
        return true;
    }

    goToPrevious(form: any) {
        if (this.save(form)) {
            // Navigate to the work page
            this.router.navigate(['/registration/personaltrip']);
        }
    }

    goToNext(form: any) {
        if (this.save(form)) {
            // Navigate to the result page
            this.router.navigate(['/registration/tripselect', this.id + 1]);
        }
    }
}
