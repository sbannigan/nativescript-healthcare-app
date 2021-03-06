import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as pageActions from '../../../templates/actions/page';
import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout';
import { Color } from 'tns-core-modules/color/color';
import { RouterExtensions } from 'nativescript-angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../core/models';
import { getAuthUser } from '../../../common/reducers';
import * as platform from 'tns-core-modules/platform';

@Component({
    moduleId: module.id,
    selector: 'healthcare-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    private temperatures: any[] = [
        { Label: 'a', Amount: 50 },
        { Label: 'b', Amount: 70 },
        { Label: 'c', Amount: 62 },
        { Label: 'd', Amount: 68 },
        { Label: 'e', Amount: 52 },
        { Label: 'f', Amount: 62 },
    ];

    private calories: any[] = [
        { Label: 'a', Amount: 50 },
        { Label: 'b', Amount: 68 },
        { Label: 'c', Amount: 95 },
        { Label: 'd', Amount: 120 },
        { Label: 'e', Amount: 95 },
        { Label: 'f', Amount: 115 },
    ];

    private heartRates: any[] = [
        { Label: 'a', Amount: 40 },
        { Label: 'b', Amount: 63 },
        { Label: 'c', Amount: 68 },
        { Label: 'd', Amount: 40 },
        { Label: 'e', Amount: 70 },
        { Label: 'f', Amount: 40 },
    ];

    private steps: any[] = [
        { Label: 'a', Amount: 40 },
        { Label: 'b', Amount: 63 },
        { Label: 'c', Amount: 68 },
        { Label: 'd', Amount: 40 },
        { Label: 'e', Amount: 70 },
        { Label: 'f', Amount: 40 },
    ];

    widgets: any[] = [
        {
            label: 'Temperature',
            value: 36.75,
            unit: '°',
            chartData: this.temperatures,
            chartType: 'line',
            chartOptions: {
                lineColor: '#FEBFAB'
            }
        },
        {
            label: 'Calories burned',
            value: 537,
            unit: 'cal',
            chartType: 'line',
            chartData: this.calories,
            chartOptions: {
                lineColor: '#21ADCB'
            }
        },
        {
            label: 'Steps',
            chartType: 'bar',
            chartData: this.steps,
            chartOptions: {
                lineColor: '#3e9ae3'
            },
            value: 3342
        },
        {
            label: 'Heart rate',
            value: 87,
            chartType: 'line',
            chartData: this.heartRates,
            chartOptions: {
                lineColor: '#D391F7'
            },
            unit: 'bpm'
        }
    ];

    authUser$: Observable<User>;

    constructor(
        private store$: Store<any>,
        private routerExt: RouterExtensions) { }

    ngOnInit() {
        if (platform.isIOS) {
            this.routerExt.frame.ios.controller.interactivePopGestureRecognizer.enabled = false;
        }
        this.authUser$ = this.store$.select(getAuthUser);
    }

    viewStatistic(event: any, widget: any) {
        this.store$.dispatch(new pageActions.ActiveWidget(widget));
        const grid = event.object as GridLayout;
        grid.animate({
            backgroundColor: new Color('#EEEEF0'),
            duration: 100
        }).then(() => {
            grid.animate({
                backgroundColor: new Color('#fff'),
                duration: 0
            }).then(() => {
                this.routerExt.navigate(['/app/dashboard', widget.label]);
            });
        });
    }

}
