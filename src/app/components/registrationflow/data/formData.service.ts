import { Injectable } from '@angular/core';

import { FormData, Personal, Trip } from './formData.model';
import { WorkflowService } from '../workflow/workflow.service';
import { STEPS } from '../workflow/workflow.model';

@Injectable()
export class FormDataService {

    private formData: FormData = new FormData();
    private isPersonalFormValid = false;
    private isPersonalTripFormValid = false;
    private isTripForm1Valid = false;
    private isTripForm2Valid = false;
    private isTripForm3Valid = false;

    constructor(private workflowService: WorkflowService) {
    }

    getPersonal(): Personal {
        // Return the Personal data
        const personal: Personal = {
            firstName: this.formData.firstName,
            lastName: this.formData.lastName,
            email: this.formData.email,
            birthDate: this.formData.birthDate,
            city: this.formData.city,
            country: this.formData.country,
            cnp: this.formData.cnp,
            phoneno: this.formData.phoneno,
            member: this.formData.member,
            accomodation: this.formData.accomodation,
            tagNo: this.formData.tagNo,
            carNo: this.formData.carNo,
            notes: this.formData.notes,
        };
        return personal;
    }

    setPersonal(data: Personal) {
        // Update the Personal data only when the Personal Form had been validated successfully
        this.isPersonalFormValid = true;
        this.formData.firstName = data.firstName;
        this.formData.lastName = data.lastName;
        this.formData.email = data.email;
        this.formData.birthDate = data.birthDate;
        this.formData.country = data.country;
        this.formData.city = data.city;
        this.formData.cnp = data.cnp;
        this.formData.phoneno = data.phoneno;
        // Validate Personal Step in Workflow
        this.workflowService.validateStep(STEPS.personal);
    }

    setPersonalTrip(data: Personal) {
        // Update the Personal data only when the Personal Form had been validated successfully
        this.isPersonalTripFormValid = true;
        this.formData.accomodation = data.accomodation;
        this.formData.member = data.member;
        this.formData.carNo = data.carNo;
        this.formData.tagNo = data.tagNo;
        this.formData.notes = data.notes;
        // Validate Personal Step in Workflow
        this.workflowService.validateStep(STEPS.personaltrip);
    }

    getTrip(step: number): Trip {
        // Return the Address data
        switch (step) {
            case 1:
                const trip1: Trip = {
                    id: this.formData.trip1Id,
                };
                return trip1;
            case 2:
                const trip2: Trip = {
                    id: this.formData.trip2Id,
                };
                return trip2;
            case 3:
                const trip3: Trip = {
                    id: this.formData.trip2Id,
                };
                return trip3;
            default:
                const trip: Trip = {
                    id: this.formData.trip1Id,
                };
                return trip;
        }
    }

    setTrip(data: Trip, step: number) {
        // Update the Address data only when the Address Form had been validated successfully
        switch (step) {
            case 1:
                this.formData.trip1Id = data.id;
                this.isTripForm1Valid = true;
                this.workflowService.validateStep(STEPS.trip1);
                break;
            case 2:
                this.formData.trip2Id = data.id;
                this.isTripForm2Valid = true;
                this.workflowService.validateStep(STEPS.trip2);
                break;
            case 3:
                this.formData.trip3Id = data.id;
                this.isTripForm3Valid = true;
                this.workflowService.validateStep(STEPS.trip3);
                break;
            default:
                this.formData.trip1Id = data.id;
                this.isTripForm1Valid = true;
                this.workflowService.validateStep(STEPS.trip1);
        }
    }

    getFormData(): FormData {
        // Return the entire Form Data
        return this.formData;
    }

    resetFormData(): FormData {
        // Reset the workflow
        this.workflowService.resetSteps();
        // Return the form data after all this.* members had been reset
        this.formData.clear();
        // tslint:disable-next-line:max-line-length
        this.isPersonalFormValid = this.isPersonalTripFormValid = this.isTripForm1Valid = this.isTripForm2Valid = this.isTripForm3Valid = false;
        return this.formData;
    }

    isFormValid() {
        // Return true if all forms had been validated successfully; otherwise, return false
        return this.isPersonalFormValid &&
            this.isPersonalTripFormValid &&
            this.isTripForm1Valid &&
            this.isTripForm2Valid &&
            this.isTripForm3Valid;
    }
}
