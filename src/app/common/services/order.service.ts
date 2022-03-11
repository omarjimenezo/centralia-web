import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { IOrder, IOrderList } from 'src/app/common/models/order.model';
import { AlertService } from 'src/app/common/services/alert.service';
import { ICatalog } from '../models/catalog.model';
import { IAlertInfo } from '../../client/models/alert.model';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private _order = new BehaviorSubject<IOrder>({
        id: 0,
        status: 0,
        total: 0,
        vendor_id: 0,
        order_list: [],
    });
    private _total = new BehaviorSubject<number>(0);

    constructor(private _alertService: AlertService) {}

    // Order
    public setOrder(order: IOrder) {
        this._order.next(order);
    }

    get getOrder(): Observable<IOrder> {
        return this._order.asObservable();
    }

    public setOrders(order: IOrder) {
        let orders: IOrder[] = [];
        if(localStorage.getItem('order')) {
            orders = <IOrder[]>JSON.parse(localStorage.getItem('order')!)
        } 
        orders.push(order)
        localStorage.setItem('order', JSON.stringify(orders));
    }

    public getOrders(userId: number): IOrder[] {
        let orders: IOrder[] = [];
        if (localStorage.getItem('order')) {
            orders = <IOrder[]>JSON.parse(localStorage.getItem('order')!)
        }

        if (userId !== 1) {
            return orders.filter((order: IOrder) => order.vendor_id == userId)
        } else {
            return orders
        }
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

    public resetOrder(): void {
        let order: IOrder = {
            id: 0,
            status: 0,
            total: 0,
            vendor_id: 0,
            order_list: [],
        }
        this.setOrder(order);
        this.calcTotal();
    }

    // Total

    public calcTotal(): void {
        const order: IOrder = this._order.value;
        let total = 0;
        order.order_list.forEach((product: IOrderList) => {
            total += parseFloat(product.price!) * product.quantity;
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
        const productFound = order.order_list.find(
            (product) => product.sku === element.sku
        );
        const alertInfo: IAlertInfo = { screen: 'catalog', type: 'success' };

        if (productFound) {
            productFound.quantity = quantity;
        } else {
            element.selected = true;

            order.order_list.push({
                id: element.id,
                description: element.description,
                sku: element.sku,
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
        let order: IOrder = this._order.value;
        const alertInfo: IAlertInfo = { screen: 'catalog', type: 'success' };
        const producto = order.order_list.find(
            (product) => product.sku === sku
        );

        const orderList = order.order_list.filter(
            (product) => product.sku !== sku
        );

        order.order_list = orderList;

        this.setOrder(order);
        this.calcTotal();
        this._alertService.openAlert(
            `Se quitaron ${producto?.quantity} productos`,
            alertInfo
        );

        if (order.order_list.length <= 0) {
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
