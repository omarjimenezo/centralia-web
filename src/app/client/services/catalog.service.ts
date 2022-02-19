import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICatalog, ICategory } from '../models/catalog.model';

@Injectable({
    providedIn: 'root',
})
export class CatalogService {
    private baseURL: string = 'https://centralia.app/api';
    private _search = new BehaviorSubject<string>('');
    private _filter = new BehaviorSubject<string>('');
    private _providerId = new BehaviorSubject<string>('');
    private _catalog = new BehaviorSubject<ICatalog[]>([]);
    private _category = new BehaviorSubject<ICategory[]>([]);

    constructor(private _http: HttpClient) {
        this.initCatalog();
        this.initCategory();
    }

    // Catalog

    public initCatalog(): void {
        if (this._providerId.value) {
            this._http
                .get<ICatalog[]>(
                    `${this.baseURL}/catalog/user/${this._providerId.value}`
                )
                .subscribe((catalog: ICatalog[]) => {
                    this.setCatalog(catalog);
                });
        }
    }

    public setCatalog(catalog: ICatalog[]) {
        this._catalog.next(catalog);
    }

    get getCatalog(): Observable<ICatalog[]> {
        return this._catalog.asObservable();
    }

    //  Category

    public initCategory(): void {
        if (this._providerId.value) {
            this._http
                .get<ICategory[]>(
                    `${this.baseURL}/categories/user/${this._providerId.value}`
                )
                .subscribe((category: ICategory[]) => {
                    this.setCategory(category);
                });
        }
    }

    public setCategory(category: ICategory[]) {
        this._category.next(category);
    }

    get getCategory(): Observable<ICategory[]> {
        return this._category.asObservable();
    }

    // Provider

    public setProviderId(id: string) {
        if(id) {
            this._providerId.next(id);
            this.initCatalog();
            this.initCategory();
        }
    }

    get getProviderId(): Observable<string> {
        return this._providerId.asObservable();
    }
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
