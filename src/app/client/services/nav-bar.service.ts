import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IClient } from 'src/app/common/models/user.model';

@Injectable({
    providedIn: 'root',
})
export class NavBarService {
    private _providerId = new BehaviorSubject<string>('');

    constructor(private _router: Router) {}

    // Provider

    public setProviderId(id: string) {
        if (id) {
            this._providerId.next(id);
        }
    }

    get getProviderId(): Observable<string> {
        return this._providerId.asObservable();
    }

    public setVendorId(vendorId: number) {
        let client: IClient;
        if (localStorage.getItem('client')) {
            client = <IClient>JSON.parse(localStorage.getItem('client')!);
            client.vendorId = vendorId;
            localStorage.setItem('client', JSON.stringify(client));
        } else {
            client = { vendorId: vendorId };
            localStorage.setItem('client', JSON.stringify(client));
        }
    }
}
