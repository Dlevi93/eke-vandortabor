import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Personal } from '../data/formData.model';
import { FormDataService } from '../data/formData.service';
import { TripSelectorService, TripApi } from './tripselect.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'mt-wizard-tripselect',
    templateUrl: './tripselect.component.html',
    providers: [TripSelectorService],
    styleUrls: ['./tripselect.component.css']
})

export class TripSelectComponent implements OnInit, OnDestroy {
    form: any;

    public id: number;
    private sub: any;

    tripListApi: TripApi[];
    tripApiDescription: TripApi;

    personal: Personal;

    constructor(private router: Router, private formDataService: FormDataService, private activatedRoute: ActivatedRoute,
        private tripSelectorService: TripSelectorService, private spinnerService: Ng4LoadingSpinnerService) {
    }

    ngOnInit() {
        this.spinnerService.show();
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.spinnerService.show();
            this.id = + params['id'];

            this.personal = this.formDataService.getPersonal();
            this.tripSelectorService.getTrips(this.id).subscribe(result => { this.tripListApi = result, this.spinnerService.hide(); });
            this.spinnerService.show();

            this.tripApiDescription = null;
            this.personal.activeTrip = null;
            if (this.id === 1) {
                this.personal.activeTrip = this.personal.trip1;
            } else if (this.id === 2) {
                this.personal.activeTrip = this.personal.trip2;
            } else if (this.id === 3) {
                this.personal.activeTrip = this.personal.trip3;
            }

            if (this.personal.activeTrip !== undefined) {
                // tslint:disable-next-line:max-line-length
                this.tripSelectorService.getTrip(this.personal.activeTrip.id, this.id).subscribe(result => { this.tripApiDescription = result, this.spinnerService.hide(); });
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

        this.formDataService.setTrip(this.personal, this.id);
        return true;
    }

    goToPrevious(form: any) {
        if (this.save(form, true)) {
            if (this.id > 1) {
                this.router.navigate(['/registration/tripselect', this.id - 1]);
            } else {
                this.router.navigate(['/registration/pstrip']);
            }
        }
    }

    goToNext(form: any) {
        if (this.save(form, false)) {
            if (this.id === 3) {
                this.router.navigate(['/registration/result']);
            } else {
                this.router.navigate(['/registration/tripselect', this.id + 1]);
            }
        }
    }

    getTrip(trip: TripApi) {
        this.spinnerService.show();
        // tslint:disable-next-line:max-line-length
        this.tripSelectorService.getTrip(trip.id, this.id).subscribe(result => { this.tripApiDescription = result, this.spinnerService.hide(); },
            error => { this.spinnerService.hide(), this.tripApiDescription = null; });
    }
}
