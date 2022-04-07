import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/models/global.constants';
import { ICatalog, ICatalogResponse, ICategory } from '../../common/models/catalog.model';
import { NavBarService } from './nav-bar.service';

@Injectable({
    providedIn: 'root',
})
export class CatalogService {
    private _catalog = new BehaviorSubject<ICatalog[]>([]);
    private _category = new BehaviorSubject<ICategory[]>([]);
    private _resetCatalog = new BehaviorSubject('');

    constructor(
        private _http: HttpClient,
        private _navBarService: NavBarService,
        private _global: GlobalConstants
    ) {
        this._navBarService.getProviderId.subscribe((providerId) => {
            this.initCatalog(providerId);
            this.initCategories(providerId);
        });
    }

    // Catalog
    public initCatalog(providerId: string): void {
        if (providerId) {
            this._http
                .get<ICatalogResponse>(
                    `${this._global.ENDPOINTS.CATALOG.GET_CATALOG}/${providerId}`
                )
                .subscribe((catalog: ICatalogResponse) => {
                    if (catalog && catalog.data) {
                        catalog.data.map(
                            (product) =>
                                (product.price = product.price.replace(
                                    ',',
                                    '.'
                                ))
                        );
                        this.setCatalog(catalog.data);
                    }
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
    public initCategories(providerId: string): void {
        if (providerId) {
            this._http
                .get<ICategory[]>(
                    `${this._global.ENDPOINTS.CATALOG.GET_CATEGORIES}/${providerId}`
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
