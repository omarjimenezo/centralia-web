import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/models/global.constants';
import { IProduct, ICategory, IProductResponse, ICategoryResponse } from '../models/product.model';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private _product = new BehaviorSubject<IProduct[]>([]);
    private _category = new BehaviorSubject<ICategory[]>([]);
    private _resetProduct = new BehaviorSubject('');

    constructor(
        private _http: HttpClient,
        private _global: GlobalConstants
    ) {

    }

    // Catalog
    public initCatalog(businessId: string): void {
        this._http
            .get<IProductResponse>(
                `${this._global.ENDPOINTS.PRODUCT.GET_PRODUCTS}/${businessId}`
            )
            .subscribe((catalog: IProductResponse) => {
                if (catalog && catalog.data) {
                    this.setProduct(catalog.data);
                }
            });
    }

    public setProduct(catalog: IProduct[]): void {
        this._product.next(catalog);
    }

    get getCatalog(): Observable<IProduct[]> {
        return this._product.asObservable();
    }

    public resetQuantities(): void {
        this._resetProduct.next('');
    }

    get getResetQuantities(): Observable<string> {
        return this._resetProduct.asObservable();
    }

    //  Category
    public initCategories(businessId: string): void {
        this._http
            .get<ICategoryResponse>(
                `${this._global.ENDPOINTS.CATALOG.GET_CATEGORIES}/${businessId}`
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
