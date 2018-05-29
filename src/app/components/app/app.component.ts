import { Component, OnInit, Input } from '@angular/core';
import { query } from '@angular/core/src/render3/instructions';
import { FormDataService } from '../registrationflow/data/formData.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
    @Input() formData;

    constructor(private formDataService: FormDataService) {
    }

    ngOnInit() {
        this.formData = this.formDataService.getFormData();
    }
}
