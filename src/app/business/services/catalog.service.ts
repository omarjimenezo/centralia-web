import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/models/global.constants';
import { DataService } from 'src/app/common/services/data.service';
import { IBusinessProducts, IProductResponse, ICategory, ICategoryResponse } from '../../common/models/product.model';

@Injectable({
    providedIn: 'root',
})
export class CatalogService {
    private _catalog = new BehaviorSubject<IBusinessProducts[]>([]);
    private _category = new BehaviorSubject<ICategory[]>([]);
    private _resetCatalog = new BehaviorSubject('');

    constructor(
        private _http: HttpClient,
        private _dataService: DataService,
        private _global: GlobalConstants
    ) {
        this._dataService.getProviderId.subscribe((providerId: string) => {
            // this.initCatalog(providerId);
            // this.initCategories(providerId);
        });
    }

    // Catalog
    public initCatalog(providerId: string): void {
        if (providerId) {
            this._http
                .get<IProductResponse>(
                    `${this._global.ENDPOINTS.CATALOG.GET_CATALOG}/${providerId}`
                )
                .subscribe((catalog: IProductResponse) => {
                    if (catalog && catalog.data) {
                        this.setCatalog(catalog.data);
                    }
                });
        }
    }

    public setCatalog(catalog: IBusinessProducts[]): void {
        this._catalog.next(catalog);
    }

    get getCatalog(): Observable<IBusinessProducts[]> {
        return this._catalog.asObservable();
    }

    public resetQuantities(): void {
        this._resetCatalog.next('');
    }

    get getResetQuantities(): Observable<string> {
        return this._resetCatalog.asObservable();
    }

    //  Category
    public initCategories(providerId: string): void {
        if (providerId) {
            this._http
                .get<ICategoryResponse>(
                    `${this._global.ENDPOINTS.CATALOG.GET_CATEGORIES}/${providerId}`
                )
                .subscribe((category: ICategoryResponse) => {
                    if (category && category.data) {
                        this.setCategory(category.data);
                    }
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
