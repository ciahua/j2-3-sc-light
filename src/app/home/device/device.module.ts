import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PositionComponent } from './position/position.component';
import { ClassComponent } from './class/class.component';
import { ProductComponent } from './product/product.component';
import { SurveyComponent } from './survey/survey.component';
import { FormsModule } from '@angular/forms';




@NgModule({
    imports: [
        FormsModule,
        BrowserModule
    ],
    declarations: [
    PositionComponent,
    ClassComponent,
    ProductComponent,
    SurveyComponent,
]
})
export class DeviceModule { }
