import { Component, OnInit, Input } from '@angular/core';

import { FormData } from '../data/formData.model';
import { FormDataService } from '../data/formData.service';
import { HttpClient } from '@angular/common/http';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'mt-wizard-result',
    templateUrl: './result.component.html'
})

export class ResultComponent implements OnInit {
    title = 'Összegzés';
    @Input() formData: FormData;
    isFormValid = false;
    _http: HttpClient;

    constructor(private formDataService: FormDataService, http: HttpClient) {
        this._http = http;
    }

    ngOnInit() {
        this.formData = this.formDataService.getFormData();
        this.isFormValid = this.formDataService.isFormValid();
        console.log('Result feature loaded!');
    }

    submit() {
        alert('Excellent Job!');

        console.log(this.formData);
        this._http.post('http://localhost:49223/api/values/', this.formData).subscribe(res => console.log(res));
        // this.formData = this.formDataService.resetFormData();
        this.isFormValid = false;
    }
}
