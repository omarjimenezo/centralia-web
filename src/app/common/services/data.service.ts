import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject, Observable } from "rxjs";
import { IDependencyResponse } from "src/app/auth/models/auth.model";
import { GlobalConstants } from "../models/global.constants";
import { IOrderStatusCatalog, IOrderStatusCatalogResponse } from "../models/order.model";
import { IUser, IUserResponse } from "../models/user.model";

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private _providerId = new BehaviorSubject<string>('');
    private _vendorId = new BehaviorSubject<string>('');
    private _orderStatusCatalog = new BehaviorSubject<IOrderStatusCatalog[]>([]);

    constructor(
        private _http: HttpClient,
        private _global: GlobalConstants,
        private _cookieService: CookieService,
    ) { }

    // User
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
            `${this._global.ENDPOINTS.DATA.GET_USER}/${id}`
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
            this._cookieService.delete('userInfo', '/');
            user.vendor_id = vendorId;
            this._cookieService.set('userInfo', JSON.stringify(user));
        } else {
            const user = { vendor_id: vendorId };
            this._cookieService.set('userInfo', JSON.stringify(user));
        }
    }

    public getUserInfo(): IUser {
        return (this._cookieService.get('userInfo')) ? JSON.parse(this._cookieService.get('userInfo')) : false;
    }

    public getDependencyBySubId(sub_user_id: string): Observable<IDependencyResponse> {
        return this._http.get<IDependencyResponse>(`${this._global.ENDPOINTS.DEPENDENCY.GET_SUPERIOR}/${sub_user_id}`);
    }

    public getDependencyBySupId(sup_user_id: string): Observable<IDependencyResponse> {
        return this._http.get<IDependencyResponse>(`${this._global.ENDPOINTS.DEPENDENCY.GET_SUBORDINATES}/${sup_user_id}`);
    }

    // Order
    public _setOrderStatusCatalog(orderStatusCatalog: IOrderStatusCatalog[]) {
        this._orderStatusCatalog.next(orderStatusCatalog);
    }

    public _getOrderStatusCatalog(): IOrderStatusCatalog[] {
        return this._orderStatusCatalog.value;
    }

    public getOrderStatusCatalog(): void {
        this._http.get<IOrderStatusCatalogResponse>(
            `${this._global.ENDPOINTS.DATA.GET_ORDER_STATUS_CATALOG}`
        ).subscribe((res: IOrderStatusCatalogResponse) => {
            if (res && res.data) {
                this._setOrderStatusCatalog(res.data);
            }
        });
    }
}