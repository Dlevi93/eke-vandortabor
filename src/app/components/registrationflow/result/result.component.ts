import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { FormData } from '../data/formData.model';
import { FormDataService } from '../data/formData.service';
import { HttpClient } from '@angular/common/http';

import { Message } from 'primeng/api';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppSettings } from '../../app/app.settings';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'mt-wizard-result',
    templateUrl: './result.component.html'
})

export class ResultComponent implements OnInit {
    title = 'Összegzés';
    msgs: Message[] = [];

    @Input() formData: FormData;
    isFormValid = false;
    _http: HttpClient;

    constructor(private formDataService: FormDataService, http: HttpClient, private router: Router,
        private spinnerService: Ng4LoadingSpinnerService) {
        this._http = http;
    }

    ngOnInit() {
        this.formData = this.formDataService.getFormData();
        this.isFormValid = this.formDataService.isFormValid();
        console.log('Result feature loaded!');
    }

    submit() {
        this.spinnerService.show();
        console.log(this.formData);
        this._http.post(AppSettings.API_ENDPOINT + '/', this.formData).subscribe(res => {
            this.showSuccessMessage();
            this.isFormValid = false;
            setTimeout(() => {
                this.spinnerService.hide();
                this.formData = this.formDataService.resetFormData(); this.router.navigate(['/home']);
            }, 2000);
        });
    }

    showSuccessMessage() {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Gratulálunk', detail: 'Sikeres feliratkozás!' });
    }
}
