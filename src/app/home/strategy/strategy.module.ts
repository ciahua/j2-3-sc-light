import { NgModule } from '@angular/core';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatStepperModule, MatInputModule, MatCardModule, MatSliderModule, MatSlideToggleModule } from '@angular/material';


import { SharedModule } from '../../shared/shared.module';

import { StrategyComponent } from './strategy.component';


@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        FormsModule, ReactiveFormsModule,
        SharedModule,
        MatStepperModule, MatButtonModule, MatInputModule, MatCardModule,
        MatSliderModule, MatSlideToggleModule,
    ],
    declarations: [StrategyComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class StrategyModule { }
