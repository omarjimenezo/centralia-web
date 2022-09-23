import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/models/global.constants';
import { DataService } from 'src/app/common/services/data.service';
import { ICatalog, ICatalogResponse, ICategory, ICategoryResponse } from '../../common/models/catalog.model';

@Injectable({
    providedIn: 'root',
})
export class CatalogService {
    private _catalog = new BehaviorSubject<ICatalog[]>([]);
    private _category = new BehaviorSubject<ICategory[]>([]);
    private _resetCatalog = new BehaviorSubject('');

    constructor(
        private _http: HttpClient,
        private _dataService: DataService,
        private _global: GlobalConstants
    ) {
        
    }

    // Catalog
    public initCatalog(providerId: number): void {
        this._http
            .get<ICatalogResponse>(
                `${this._global.ENDPOINTS.CATALOG.GET_CATALOG}/${providerId}`
            )
            .subscribe((catalog: ICatalogResponse) => {
                if (catalog && catalog.data) {
                    this.setCatalog(catalog.data);
                }
            });
    }

    public setCatalog(catalog: ICatalog[]): void {
        this._catalog.next(catalog);
    }

    get getCatalog(): Observable<ICatalog[]> {
        return this._catalog.asObservable();
    }

    public resetQuantities(): void {
        this._resetCatalog.next('');
    }

    get getResetQuantities(): Observable<string> {
        return this._resetCatalog.asObservable();
    }

    //  Category
    public initCategories(providerId: number): void {
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

    public setCategory(category: ICategory[]) {
        this._category.next(category);
    }

    get getCategory(): Observable<ICategory[]> {
        return this._category.asObservable();
    }
}
