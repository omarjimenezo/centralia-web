import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertService } from 'src/app/common/services/alert.service';
import { IAlertInfo } from '../models/alert.model';
import { ICatalog, IOrder } from '../../common/models/catalog.model';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private _order = new BehaviorSubject<IOrder[]>([]);
    private _total = new BehaviorSubject<number>(0);

    constructor(private _alertService: AlertService) {}

    public setOrder(order: IOrder[]) {
        this._order.next(order);
    }

    get getOrder(): Observable<IOrder[]> {
        return this._order.asObservable();
    }

    public calcTotal(): void {
        let total = 0;
        this._order.value.forEach((product) => {
            total += parseFloat(product.price) * product.quantity;
        });
        this.setTotal(total);
    }

    public setTotal(total: number) {
        this._total.next(total);
    }

    get getTotal(): Observable<number> {
        return this._total.asObservable();
    }

    public addProduct(quantity: number, element: ICatalog): void {
        const order = this._order.value;
        const productFound = order.find(
            (product) => product.sku === element.sku
        );
        const alertInfo: IAlertInfo = { screen: 'catalog', type: 'success' };

        if (productFound) {
            productFound.quantity = quantity;
        } else {
            element.selected = true;

            order.push({
                sku: element.sku,
                description: element.description,
                price: element.price,
                quantity: quantity,
            });
        }
        this.setOrder(order);
        this.calcTotal();
        this._alertService.openAlert(
            `Se agregaron ${quantity} productos`,
            alertInfo
        );
    }

    public removeProduct(sku: string) {
        const alertInfo: IAlertInfo = { screen: 'catalog', type: 'success' };

        const producto = this._order.value.find(
            (product) => product.sku === sku
        );

        const order = this._order.value.filter(
            (product) => product.sku !== sku
        );

        this.setOrder(order);
        this.calcTotal();
        this._alertService.openAlert(
            `Se quitaron ${producto?.quantity} productos`,
            alertInfo
        );

        if(order.length <= 0) {
            const alertInfo: IAlertInfo = { screen: 'catalog', type: 'info' };
            setTimeout(() => {
                this._alertService.openAlert(
                    `0 productos en su orden`,
                    alertInfo
                );
            }, 3100);
        }
    }
}
