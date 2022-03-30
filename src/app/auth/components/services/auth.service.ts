import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { IAlertInfo } from 'src/app/client/models/alert.model';
import { GlobalConstants } from 'src/app/common/models/global.constants';
import { IUser, IUserResponse } from '../../../common/models/user.model';
import { AlertService } from '../../../common/services/alert.service';
import { ILoginRequest, ILoginResponse } from '../../models/auth.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private alertInfo: IAlertInfo = {
        screen: 'auth',
        type: 'error',
    };

    public user: IUser;

    constructor(
        private _router: Router,
        private _alertService: AlertService,
        private _http: HttpClient,
        private _cookieService: CookieService,
        private _global: GlobalConstants
    ) {}

    public login(loginRequest: ILoginRequest): Observable<ILoginResponse> {
        return this._http.post<ILoginResponse>(`${this._global.ENDPOINTS.AUTH.LOGIN}`, loginRequest);
    }

    public setUser(user: IUser): void {
        this._cookieService.set(
            'userInfo',
            JSON.stringify(user)
        );
    }

    public getUser(id: string): Observable<IUserResponse> {
        return this._http.get<IUserResponse>(`${this._global.ENDPOINTS.AUTH.GET_USER}${id}`)
    }

    public getUserInfo(): IUser {
        return JSON.parse(this._cookieService.get('userInfo'));
    }

}
