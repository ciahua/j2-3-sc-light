import { BrowserModule } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule, } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule, MatCheckboxModule, MatSliderModule, MatSlideToggleModule} from '@angular/material';


import { CoverComponent } from './cover/cover.component';
import { CalamityComponent } from './calamity/calamity.component';

import { LightComponent } from './light/light.component';
import { SecurityComponent } from './security/security.component';
import { TrafficComponent } from './traffic/traffic.component';
import { WaterComponent } from './water/water.component';
import { AirComponent } from './air/air.component';
import { ElectricalComponent } from './electrical/electrical.component';


@NgModule({
    imports: [BrowserModule, FormsModule, NgbModule,
        MatButtonModule, MatCheckboxModule, MatSliderModule, MatSlideToggleModule
    ],
    declarations: [
        CoverComponent, CalamityComponent,
        LightComponent, SecurityComponent, TrafficComponent, WaterComponent, AirComponent, ElectricalComponent
],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class ApplicationModule { }
