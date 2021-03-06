import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardDetailComponent } from './components/dashboard-detail/dashboard-detail.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        data: {}
    },
    {
        path: ':type',
        component: DashboardDetailComponent,
        data: {
            actionBar: {
                rightIcon: 'plus-circle-o'
            },
            hasBack: true
        }
    }
];

@NgModule({
    imports: [
        NativeScriptRouterModule.forChild(routes)
    ],
    exports: [
        NativeScriptRouterModule
    ]
})
export class DashboardRoutingModule { }
