import { NgModule } from '@angular/core';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardtRoutingModule } from './dashboard-routing.module';


import { DashboardComponent } from './dashboard.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        DashboardtRoutingModule

    ],
    declarations: [DashboardComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class DashboardModule { }
