import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NavBarService {
    private _providerId = new BehaviorSubject<string>('');

    constructor(private _router: Router
        ) {}

    // Provider

    public setProviderId(id: string) {
        if(id) {
            this._providerId.next(id);
        }
    }

    get getProviderId(): Observable<string> {
        return this._providerId.asObservable();
    }
    
}
