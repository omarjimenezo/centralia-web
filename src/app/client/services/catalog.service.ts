import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICatalog, ICategory } from '../../common/models/catalog.model';
import { NavBarService } from './nav-bar.service';

@Injectable({
    providedIn: 'root',
})
export class CatalogService {
    private baseURL: string = 'https://centralia.app/api';
    private _catalog = new BehaviorSubject<ICatalog[]>([]);
    private _category = new BehaviorSubject<ICategory[]>([]);
    private _resetCatalog = new BehaviorSubject('');

    constructor(
        private _http: HttpClient,
        private _navBarService: NavBarService
    ) {
        this._navBarService.getProviderId.subscribe((providerId) => {
            this.initCatalog(providerId);
            this.initCategory(providerId);
        });
    }

    // Catalog
    public initCatalog(providerId: string): void {
        if (providerId) {
            this._http
                .get<ICatalog[]>(`${this.baseURL}/catalog/user/${providerId}`)
                .subscribe((catalog: ICatalog[]) => {
                    catalog.map(
                        (product) =>
                            (product.price = product.price.replace(',', '.'))
                    );
                    this.setCatalog(catalog);
                });
        }
    }

    public setCatalog(catalog: ICatalog[]): void {
        this._catalog.next(catalog);
    }

    get getCatalog(): Observable<ICatalog[]> {
        return this._catalog.asObservable();
    }

    //  Category
    public initCategory(providerId: string): void {
        if (providerId) {
            this._http
                .get<ICategory[]>(
                    `${this.baseURL}/categories/user/${providerId}`
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
}
