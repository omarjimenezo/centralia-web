import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductLine } from '../models/product.model';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(private _http: HttpClient) {}

    public getProductLine(): Observable<Product[]> {
        return this._http.get<Product[]>('https://centralia.app/api/catalog/user/2');
        // return this._http.get<ProductLine[]>('./assets/data/products.json');
    }
}
