import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NavMenu } from '../models/nav-bar.model';

@Injectable({
    providedIn: 'root',
})
export class NavBarService {
    constructor(private _http: HttpClient) {}

    public getNavMenu(): Observable<NavMenu[]> {
        return this._http.get<NavMenu[]>('./assets/data/menu.json');
    }
}
