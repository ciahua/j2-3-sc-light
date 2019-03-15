import { NgModule } from '@angular/core';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule, } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule, MatCheckboxModule, MatSliderModule, MatSlideToggleModule} from '@angular/material';
import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { CoverComponent } from './cover/cover.component';
import { CalamityComponent } from './calamity/calamity.component';
import { SecurityComponent } from './security/security.component';
import { TrafficComponent } from './traffic/traffic.component';
import { WaterComponent } from './water/water.component';
import { ElectricalComponent } from './electrical/electrical.component';
import { LedModule } from './led/led.module';
import { LightModule } from './light/light.module';



@NgModule({
    imports: [CommonModule, FormsModule, NgbModule, ApplicationRoutingModule,
        MatButtonModule, MatCheckboxModule, MatSliderModule, MatSlideToggleModule,
        LedModule, LightModule
    ],
    declarations: [
        ApplicationComponent,
        CoverComponent, CalamityComponent,
        SecurityComponent,
        TrafficComponent, WaterComponent,
        ElectricalComponent,

],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class ApplicationModule { }
