import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Route, Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/models/global.constants';
import { DataService } from 'src/app/common/services/data.service';
import { IUser } from 'src/app/common/models/user.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private _global: GlobalConstants,
        private _authService: AuthService,
        private _dataService: DataService,
        private _routeService: Router
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (this._authService.getToken() !== '') {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this._authService.getToken()}`,
                },
            });
        } 
        // else {
        //     this._routeService.navigate([this._global.ROUTES.AUTH.LOGIN]);
        // }

        return next.handle(request);
    }
}
