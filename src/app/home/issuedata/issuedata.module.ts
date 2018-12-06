import { NgModule } from '@angular/core';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IssuedataComponent } from './issuedata.component';
import { IssuedataRoutingModule } from './issuedata-routing.module';


@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        FormsModule, ReactiveFormsModule,
        IssuedataRoutingModule

    ],
    declarations: [IssuedataComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class IssuedataModule { }
