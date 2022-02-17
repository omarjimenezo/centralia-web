import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Product } from '../models/product.model';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(private _http: HttpClient) {}

    public getCatalog(): Observable<Product[]> {
        return this._http.get<Product[]>('https://centralia.app/api/catalog/user/2');
        // return this._http.get<ProductLine[]>('./assets/data/products.json');
    }
    public getCategory(): Observable<Category[]> {
        return this._http.get<Category[]>('https://centralia.app/api/categories/user/2');
        // return this._http.get<ProductLine[]>('./assets/data/products.json');
    }
}
