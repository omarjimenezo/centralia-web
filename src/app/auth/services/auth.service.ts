import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/models/global.constants';
import { IUser, IUserResponse } from '../../common/models/user.model';
import { AlertService } from '../../common/services/alert.service';
import { ILoginRequest, ILoginResponse } from '../models/auth.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public user: IUser;

    constructor(
        private _routerService: Router,
        private _http: HttpClient,
        private _cookieService: CookieService,
        private _global: GlobalConstants
    ) {}

    public isAuthenticated(): boolean {
        return this.getToken() ? true : false;
    }

    public setToken(token: string): void {
        this._cookieService.delete('tokenAuth', '/');
        this._cookieService.set('tokenAuth', token, undefined, '/');
    }

    public getToken(): string {
        if (this._cookieService.get('tokenAuth')) {
            return this._cookieService.get('tokenAuth');
        } else {
            return '';
        }
    }

    public login(loginRequest: ILoginRequest): Observable<ILoginResponse> {
        return this._http.post<ILoginResponse>(
            `${this._global.ENDPOINTS.AUTH.LOGIN}`,
            loginRequest
        );
    }

    public logout(): void {
        this._cookieService.delete('tokenAuth', '/');
        this._cookieService.delete('userInfo', '/');
        this._routerService.navigate([this._global.ROUTES.AUTH.LOGIN]);
    }

    public setUser(user: IUser): void {
        this._cookieService.delete('userInfo', '/');
        this._cookieService.set(
            'userInfo',
            JSON.stringify(user),
            undefined,
            '/'
        );
    }

    public getUser(id: string): Observable<IUserResponse> {
        return this._http.get<IUserResponse>(
            `${this._global.ENDPOINTS.AUTH.GET_USER}/${id}`
        );
    }

    public getUserRole(): string {
        if (this._cookieService.get('userInfo')) {
            const userInfo: IUser = JSON.parse(
                this._cookieService.get('userInfo')
            );
            return userInfo.type;
        } else {
            return '';
        }
    }

    public getUserInfo(): IUser {
        return JSON.parse(this._cookieService.get('userInfo'));
    }

    public landingPage(userType: string): void {
        switch (userType) {
            case this._global.USER_TYPES.PROVIDER:
                this._routerService.navigate([
                    this._global.ROUTES.PROVIDER.ORDERS,
                ]);
                break;
            case this._global.USER_TYPES.USER:
                this._routerService.navigate([
                    this._global.ROUTES.CLIENT.PROVIDERS,
                ]);
                break;
        }
    }
}
