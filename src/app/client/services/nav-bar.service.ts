import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from 'src/app/common/models/user.model';

@Injectable({
    providedIn: 'root',
})
export class NavBarService {
    private _providerId = new BehaviorSubject<string>('');

    constructor(private _cookieService: CookieService) {}

    get getProviderId(): Observable<string> {
        return this._providerId.asObservable();
    }

    public setProviderId(providerId: string) {
        let user: IUser;
        this._providerId.next(providerId);
        if (this._cookieService.get('userInfo')) {
            user = <IUser>JSON.parse(this._cookieService.get('userInfo'));
            user.provider_id = providerId;
            this._cookieService.set('userInfo', JSON.stringify(user));
        } else {
            const user = { provider_id: providerId };
            localStorage.setItem('userInfo', JSON.stringify(user));
        }
    }
}
