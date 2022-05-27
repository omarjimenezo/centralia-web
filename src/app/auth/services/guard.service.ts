import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { GlobalConstants } from 'src/app/common/models/global.constants';
import { AlertService } from 'src/app/common/services/alert.service';
import { DataService } from 'src/app/common/services/data.service';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private _global: GlobalConstants,
        private _authService: AuthService,
        private _dataService: DataService,
        private _router: Router,
        private _alertService: AlertService
    ) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        // this will be passed from the route config
        // on the data property
        const expectedRole = route.data.expectedRole;
        // decode the token to get its payload
        const userRole = this._dataService.getUserRole();
        if (!this._authService.isAuthenticated() || !expectedRole.includes(userRole)) {
            this._router.navigate([this._global.ROUTES.AUTH.LOGIN]);
            this._alertService.openAlert(
                this._global.ERROR_MESSAGES.USER_UNAUTHORIZED,
                1
            );
            return false;
        }
        return true;
    }
}
