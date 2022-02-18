import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Catalog, Category } from '../models/catalog.model';

@Injectable({
    providedIn: 'root',
})
export class CatalogService {
    private baseURL: string = 'https://centralia.app/api';
    private _search = new BehaviorSubject<string>('');
    private _filter = new BehaviorSubject<string>('');
    private _catalog = new BehaviorSubject<Catalog[]>([]);
    private _category = new BehaviorSubject<Category[]>([]);

    constructor(private _http: HttpClient) {
        this.initCatalog(2);
        this.initCategory(2);
    }

    // Catalog

    public initCatalog(id: number): void {
        this._http
            .get<Catalog[]>(`${this.baseURL}/catalog/user/${id}`)
            .subscribe((catalog: Catalog[]) => {
                this.setCatalog(catalog);
            });
    }

    public setCatalog(catalog: Catalog[]) {
        this._catalog.next(catalog);
    }

    get getCatalog(): Observable<Catalog[]> {
        return this._catalog.asObservable();
    }

    //  Category

    public initCategory(id: number): void {
        this._http
            .get<Category[]>(`${this.baseURL}/categories/user/${id}`)
            .subscribe((category: Category[]) => {
                this.setCategory(category);
            });
    }

    public setCategory(category: Category[]) {
        this._category.next(category);
    }

    get getCategory(): Observable<Category[]> {
        return this._category.asObservable();
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
