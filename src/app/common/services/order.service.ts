import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IOrder, IOrderList } from 'src/app/common/models/order.model';
import { AlertService } from 'src/app/common/services/alert.service';
import { ICatalog } from '../models/catalog.model';
import { IAlertInfo } from '../../client/models/alert.model';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private _order = new BehaviorSubject<IOrder[]>([]);
    private _orderList = new BehaviorSubject<IOrderList[]>([]);
    private _total = new BehaviorSubject<number>(0);

    constructor(private _alertService: AlertService) {}

    // Order
    public setOrder(order: IOrder[]) {
        this._order.next(order);
    }

    get getOrder(): Observable<IOrder[]> {
        return this._order.asObservable();
    }

    public setOrderList(order: IOrderList) {
        let orderList: IOrderList[] = this._orderList.value;
        orderList.push(order);
        this._orderList.next(orderList);
    }

    get getOrderList(): Observable<IOrderList[]> {
        return this._orderList.asObservable();
    }

    public getStatus(status: number): string {
        let statusLabel: string = '';
        switch (status) {
            case 0:
                statusLabel = 'Finalizado';
                break;
            case 1:
                statusLabel = 'En Progreso';
                break;
            case 2:
                statusLabel = 'Nuevo';
                break;
        }
        return statusLabel;
    }

    // Total

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

    // Products

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
        console.log('Order: ', order);
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

        if (order.length <= 0) {
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
