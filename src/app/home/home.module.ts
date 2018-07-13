import { NgModule } from '@angular/core';

import { DeviceModule } from './device/device.module';
import { UserModule } from './user/user.module';

@NgModule({
    imports: [DeviceModule, UserModule],
    declarations: [],


})
export class HomeModule { }
