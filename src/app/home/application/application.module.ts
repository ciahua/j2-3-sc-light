import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoverComponent } from './cover/cover.component';
import { CalamityComponent } from './calamity/calamity.component';
import { EnvironmentComponent } from './environment/environment.component';
import { LightComponent } from './light/light.component';
import { SecurityComponent } from './security/security.component';
import { TrafficComponent } from './traffic/traffic.component';


@NgModule({
    imports: [BrowserModule
    ],
    declarations: [
        CoverComponent, CalamityComponent, EnvironmentComponent,
        LightComponent, SecurityComponent, TrafficComponent,
]
})
export class ApplicationModule { }
