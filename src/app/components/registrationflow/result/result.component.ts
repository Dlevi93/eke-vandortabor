import { Component, OnInit, Input } from '@angular/core';

import { FormData } from '../data/formData.model';
import { FormDataService } from '../data/formData.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'mt-wizard-result',
    templateUrl: './result.component.html'
})

export class ResultComponent implements OnInit {
    title = 'Összegzés';
    @Input() formData: FormData;
    isFormValid = false;

    constructor(private formDataService: FormDataService) {
    }

    ngOnInit() {
        this.formData = this.formDataService.getFormData();
        this.isFormValid = this.formDataService.isFormValid();
        console.log('Result feature loaded!');
    }

    submit() {
        alert('Excellent Job!');
        this.formData = this.formDataService.resetFormData();
        this.isFormValid = false;
    }
}
