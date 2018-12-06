import { NgModule } from '@angular/core';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HomepageComponent } from './homepage.component';
import { HomepageRoutingModule } from './homepage-routing.module';


@NgModule({
    imports: [
        CommonModule,
        HomepageRoutingModule,

    ],
    declarations: [HomepageComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class HomepageModule { }
