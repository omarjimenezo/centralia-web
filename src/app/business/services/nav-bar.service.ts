import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NavBarService {
    private _navBarOpened = new BehaviorSubject<boolean>(false);

    public navBarToggle(): void {
        let opened = (this._navBarOpened.value) ? false : true;
        this._navBarOpened.next(opened);
    }

    get navBarOpen(): Observable<boolean> {
        return this._navBarOpened.asObservable();
    }
}
