import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductLine } from '../models/product.model';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(private _http: HttpClient) {}

    public getProductLine(): Observable<ProductLine[]> {
        return this._http.get<ProductLine[]>('./assets/data/products.json');
    }
}
