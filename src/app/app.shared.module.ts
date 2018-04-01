import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { GrowlModule } from 'primeng/growl';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { DescriptionComponent } from './components/description/description.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { NavbarComponent } from './components/registrationflow/navbar/navbar.component';
import { PersonalComponent } from './components/registrationflow/personal/personal.component';
import { PersonalTripComponent } from './components/registrationflow/personaltrip/personaltrip.component';
import { TripSelectComponent } from './components/registrationflow/tripselect/tripselect.component';
import { ResultComponent } from './components/registrationflow/result/result.component';

/* Shared Service */
import { FormDataService } from './components/registrationflow/data/formData.service';
import { WorkflowService } from './components/registrationflow/workflow/workflow.service';
import { WorkflowGuard } from './components/registrationflow/workflow/workflow-guard.service';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        DescriptionComponent,
        RegistrationComponent,

        NavbarComponent,
        PersonalComponent,
        PersonalTripComponent,
        TripSelectComponent,
        ResultComponent,

        HomeComponent
    ],
    imports: [
        CalendarModule,
        DropdownModule,
        InputTextareaModule,
        CheckboxModule,
        Ng4LoadingSpinnerModule.forRoot(),
        GrowlModule,

        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'description', component: DescriptionComponent },
            {
                path: 'registration', component: RegistrationComponent, children: [
                    { path: 'personal', component: PersonalComponent },
                    { path: 'pstrip', component: PersonalTripComponent, canActivate: [WorkflowGuard] },
                    { path: 'tripselect/:id', component: TripSelectComponent, canActivate: [WorkflowGuard] },
                    { path: 'result', component: ResultComponent, canActivate: [WorkflowGuard] },
                    { path: '', redirectTo: '/registration/personal', pathMatch: 'full' },
                ]
            },

            { path: '**', redirectTo: 'PersonalComponent' }
        ])
    ],
    providers: [WorkflowGuard, FormDataService, WorkflowService]
})
export class AppModuleShared {
}
