import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Trip } from '../data/formData.model';
import { FormDataService } from '../data/formData.service';
import { TripSelectorService, TripApi } from './tripselect.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'mt-wizard-tripselect',
    templateUrl: './tripselect.component.html',
    providers: [TripSelectorService],
})

export class TripSelectComponent implements OnInit, OnDestroy {
    filledTrip: Trip;
    form: any;

    public id: number;
    private sub: any;

    tripListApi: Trip[];
    tripApi: TripApi;

    constructor(private router: Router, private formDataService: FormDataService, private activatedRoute: ActivatedRoute,
        private tripSelectorService: TripSelectorService, private spinnerService: Ng4LoadingSpinnerService) {
    }

    ngOnInit() {
        this.spinnerService.show();
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.id = + params['id'];

            this.filledTrip = this.formDataService.getTrip(this.id);
            this.tripSelectorService.getTrips().subscribe(result => { this.tripListApi = result, this.spinnerService.hide(); });
            this.tripApi = null;
            if (this.filledTrip.id !== '') {
                // tslint:disable-next-line:max-line-length
                this.tripSelectorService.getTrip(parseInt(this.filledTrip.id, 10)).subscribe(result => { this.tripApi = result, this.spinnerService.hide(); });
            }
        });

        console.log('Tripselect feature loaded!');
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    save(form: any, backNav: boolean): boolean {
        if (!form.valid && !backNav) {
            return false;
        }

        this.formDataService.setTrip(this.filledTrip, this.id);
        return true;
    }

    goToPrevious(form: any) {
        if (this.save(form, true)) {
            // Navigate to the work page
            this.router.navigate(['/registration/pstrip']);
        }
    }

    goToNext(form: any) {
        if (this.save(form, false)) {
            // Navigate to the result page
            this.router.navigate(['/registration/tripselect', this.id + 1]);
        }
    }

    getTrip(trip: number) {
        this.spinnerService.show();
        this.tripSelectorService.getTrip(trip).subscribe(result => { this.tripApi = result, this.spinnerService.hide(); });
    }
}
