import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule.forRoot(),
         SharedModule,
        MaterialModule,
         HomeRoutingModule,


    ],
    declarations: [
    HomeComponent,



    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]


})
export class HomeModule { }
