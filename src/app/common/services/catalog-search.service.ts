import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CatalogSearchService {
    private _search = new BehaviorSubject<string>('');
    private _filter = new BehaviorSubject<string>('');

    // Search

    public setSearch(data: string): void {
        this._search.next(data);
    }

    get getSearch(): Observable<string> {
        return this._search.asObservable();
    }

    // Filter

    public setFilter(data: string): void {
        this._filter.next(data);
    }

    get getFilter(): Observable<string> {
        return this._filter.asObservable();
    }
}
