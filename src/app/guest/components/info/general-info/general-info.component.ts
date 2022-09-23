import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/models/global.constants';

@Component({
    selector: 'general-info',
    templateUrl: './general-info.component.html',
    styleUrls: ['./general-info.component.scss'],
})
export class GeneralInfoComponent implements OnInit {

    constructor(private _routerService: Router, private _global: GlobalConstants) { }
    ngOnInit(): void {
        // Only trigger Application Insight tracking if we are running in production otherwise we'll get too many hits that are useless.


    }

    public onStartClick(): void {
        this._routerService.navigate([this._global.ROUTES.GUEST.PROVIDERS])
    }

    public onProvidersClick(): void {
        this._routerService.navigate([this._global.ROUTES.GUEST.INFOPROVIDERS])
    }

    public onBusinessClick(): void {
        this._routerService.navigate([this._global.ROUTES.GUEST.INFOBUSINESS])
    }
}
