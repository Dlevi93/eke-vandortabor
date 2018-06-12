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

    paymentTypeValues = {
        0: 120,
        1: 60,
        2: 0,
        3: 60,
        4: 30,
        5: 70,
        6: 35,
        7: 0,
        8: 30,
    };

    tripTotal: number;
    totalAmount: number;

    constructor(private formDataService: FormDataService, http: HttpClient, private router: Router,
        private spinnerService: Ng4LoadingSpinnerService) {
        this._http = http;
    }

    ngOnInit() {
        this.formData = this.formDataService.getFormData();
        this.isFormValid = this.formDataService.isFormValid();
        this.tripTotal = this.formData.trip1.price + this.formData.trip2.price + this.formData.trip3.price;

        let parkingAmount = 0;
        if (this.formData.carNo !== '') {
            parkingAmount = 5;
        }
        this.totalAmount = this.tripTotal + this.paymentTypeValues[this.formData.paymentCategory] + parkingAmount;
        console.log('Result feature loaded!');
    }

    submit() {
        this.spinnerService.show();
        console.log(this.formData);
        this._http.post(AppSettings.API_ENDPOINT + '/', this.formData, { observe: 'response' }).subscribe(res => {
            const resBody: any = res.body;
            if (resBody.statusCode === 406) {
                this.showErrorMessage('Sikertelen feliratkozás. A kijelölt túrák nem elérhetőek. Kérem ellenőrizze a bevitt adatokat');
                setTimeout(() => {
                    this.spinnerService.hide();
                    this.router.navigate(['/personal']);
                }, 5000);
            } else if (resBody.statusCode === 304) {
                this.showErrorMessage('Sikertelen feliratkozás. Kérem próbálja újra');
                this.isFormValid = false;
                setTimeout(() => {
                    this.spinnerService.hide();
                    this.formData = this.formDataService.resetFormData(); this.router.navigate(['/home']);
                }, 5000);
            } else {
                this.showSuccessMessage();
                this.isFormValid = false;
                setTimeout(() => {
                    this.spinnerService.hide();
                    this.formData = this.formDataService.resetFormData(); this.router.navigate(['/home']);
                }, 2000);
            }
        });
    }

    showSuccessMessage() {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Gratulálunk', detail: 'Sikeres feliratkozás!' });
    }

    showErrorMessage(message: string) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Hiba a feliratkozás során', detail: message });
    }

    print(): void {
        let printContents, popupWin;
        printContents = document.getElementById('print-section').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
          <html>
            <head>
              <title>EKE XXVII. Vándortábor</title>
            </head>
            <body onload="window.print();window.close()">${printContents}</body>
          </html>`
        );
        popupWin.document.close();
    }
}

export interface Body {
    statusCode: string;
}
