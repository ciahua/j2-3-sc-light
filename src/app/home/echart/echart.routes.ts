import { Route } from '@angular/router';
import { EchartComponent } from './echart.component';
export const EchartRoutes: Route[] = [

    {
        path: 'echart',
        component: EchartComponent,
        // children: [
        //     { path: '', redirectTo: 'storage', pathMatch: 'full' },
        //     ...StorageRoutes,
        //     { path: 'container', component: ContainerComponent },
        // ]
    }
];
