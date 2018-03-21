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

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
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
        CounterComponent,
        RegistrationComponent,
        FetchDataComponent,

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

        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            {
                path: 'registration', component: RegistrationComponent, children: [
                    { path: 'personal', component: PersonalComponent },
                    { path: 'pstrip', component: PersonalTripComponent, canActivate: [WorkflowGuard] },
                    { path: 'tripselect/:id', component: TripSelectComponent, canActivate: [WorkflowGuard] },
                    { path: 'result', component: ResultComponent, canActivate: [WorkflowGuard] },
                    { path: '', redirectTo: '/registration/personal', pathMatch: 'full' },
                ]

                // path: 'registration', component: RegistrationComponent, children: [
                //     { path: 'personal', component: PersonalComponent },
                //     { path: 'pstrip', component: PersonalTripComponent },
                //     { path: 'tripselect/:id', component: TripSelectComponent },
                //     { path: 'result', component: ResultComponent },
                //     { path: '', redirectTo: '/registration/personal', pathMatch: 'full' },
                // ]
            },

            { path: '**', redirectTo: 'PersonalComponent' }
        ])
    ],
    providers: [WorkflowGuard, FormDataService, WorkflowService]
})
export class AppModuleShared {
}
