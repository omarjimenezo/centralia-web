import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IOrder } from '../models/catalog.model';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private _order = new BehaviorSubject<IOrder[]>([]);
    private _total = new BehaviorSubject<number>(0);

    constructor() {}

    public setOrder(order: IOrder[]) {
        this._order.next(order);
    }

    get getOrder(): Observable<IOrder[]> {
        return this._order.asObservable();
    }

    public calcTotal(): void {
        let total = 0;
        this._order.value.forEach((product) => {
            total += (parseFloat(product.price) * product.quantity);
        });
        this.setTotal(total);
    }

    public setTotal(total: number) {
        this._total.next(total);
    }

    get getTotal(): Observable<number> {
        return this._total.asObservable();
    }
}
