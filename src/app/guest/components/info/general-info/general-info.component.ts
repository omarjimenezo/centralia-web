import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GlobalConstants } from 'src/app/common/models/global.constants';

@Component({
    selector: 'general-info',
    templateUrl: './general-info.component.html',
    styleUrls: ['./general-info.component.scss'],
})
export class GeneralInfoComponent implements OnInit {
    public isAuthenticated: boolean = false;

    constructor(
        private _routerService: Router,
        private _global: GlobalConstants,
        private _authService: AuthService
    ) {}
    ngOnInit(): void {
        // Only trigger Application Insight tracking if we are running in production otherwise we'll get too many hits that are useless.
        this.isAuthenticated = this._authService.isAuthenticated();
    }

    public onStartClick(): void {
        this.isAuthenticated
            ? this._routerService.navigate([
                  this._global.ROUTES.BUSINESS.PROVIDERS,
              ])
            : this._routerService.navigate([
                  this._global.ROUTES.COMMON.PROVIDERS,
              ]);
    }

    public onProvidersClick(): void {
        this._routerService.navigate([
            this._global.ROUTES.COMMON.INFOPROVIDERS,
        ]);
    }

    public onBusinessClick(): void {
        this._routerService.navigate([this._global.ROUTES.COMMON.INFOBUSINESS]);
    }
}
