import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/models/global.constants';
import { IUser, IUserResponse } from '../../common/models/user.model';
import { AlertService } from '../../common/services/alert.service';
import { IDependencyResponse, ILoginRequest, ILoginResponse } from '../models/auth.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _providerId = new BehaviorSubject<string>('');
    private _vendorId = new BehaviorSubject<string>('');
    public user: IUser;

    constructor(
        private _routerService: Router,
        private _http: HttpClient,
        private _cookieService: CookieService,
        private _global: GlobalConstants
    ) { }

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

    public getUserRole(): number {
        if (this._cookieService.get('userInfo')) {
            const userInfo: IUser = JSON.parse(
                this._cookieService.get('userInfo')
            );
            return userInfo.user_type;
        } else {
            return 0;
        }
    }

    get getProviderId(): Observable<string> {
        return this._providerId.asObservable();
    }

    public setProviderId(providerId: string) {
        this._providerId.next(providerId);
    }
    
    public setVendorId(vendorId: string) {
        let user: IUser;
        this._vendorId.next(vendorId);
        if (this._cookieService.get('userInfo')) {
            user = JSON.parse(this._cookieService.get('userInfo'));
            user.vendor_id = vendorId;
            this._cookieService.set('userInfo', JSON.stringify(user));
        } else {
            const user = { vendor_id: vendorId };
            localStorage.setItem('userInfo', JSON.stringify(user));
        }
    }

    public getUserInfo(): IUser {
        return JSON.parse(this._cookieService.get('userInfo'));
    }

    public getDependencyBySubId(sub_user_id: string): Observable<IDependencyResponse> {
        return this._http.get<IDependencyResponse>(`${this._global.ENDPOINTS.DEPENDENCY.GET_SUPERIOR}/${sub_user_id}`);
    }

    public getDependencyBySupId(sup_user_id: string): Observable<IDependencyResponse>  {
        return this._http.get<IDependencyResponse>(`${this._global.ENDPOINTS.DEPENDENCY.GET_SUBORDINATES}/${sup_user_id}`);
    }

    public landingPage(userType: number): void {
        switch (userType) {
            case this._global.USER_TYPES.PROVIDER:
            case this._global.USER_TYPES.AGENT:
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
