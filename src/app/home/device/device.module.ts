import { NgModule } from '@angular/core';

import { AddDeviceComponent } from './add-device/add-device.component';
import { DelDeviceComponent } from './del-device/del-device.component';
import { NewDeviceComponent } from './new-device/new-device.component';


@NgModule({
    imports: [
    ],
    declarations: [
        AddDeviceComponent,
        DelDeviceComponent,
        NewDeviceComponent,

    ]
})
export class DeviceModule { }
