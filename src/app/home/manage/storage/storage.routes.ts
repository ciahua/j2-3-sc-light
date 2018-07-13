import { Route } from '@angular/router';
import { StorageComponent } from './storage.component';
// import { DiskComponent } from './disk/index';
// import { RaidComponent } from './raid/index';
// import { RollComponent } from './roll/index';
export const StorageRoutes: Route[] = [
    // {
    //     path: 'storage',
    //     component: StorageComponent,
    //     children: [
    //         // { path: '', redirectTo: 'disk', pathMatch: 'full' },
    //         // { path: 'disk', component: DiskComponent },
    //         // { path: 'raid', component: RaidComponent },
    //         // { path: 'roll', component: RollComponent },
    //     ]
    // }
    {
        path: '',
        component: StorageComponent
    }
];
