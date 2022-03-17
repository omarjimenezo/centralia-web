import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { IOrder, IOrderList, IStatus } from 'src/app/common/models/order.model';
import { AlertService } from 'src/app/common/services/alert.service';
import { ICatalog } from '../models/catalog.model';
import { IAlertInfo } from '../../client/models/alert.model';
import { IUser } from '../models/user.model';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    public _status: IStatus[] = [
        { id: 0, label: 'Finalizado', color: '#000' },
        { id: 1, label: 'Nuevo', color: '#5b9765' },
        { id: 2, label: 'Proceso', color: '#6aaaff' },
        { id: 3, label: 'Cancelado', color: '#ff3838' },
    ];
    private _total = new BehaviorSubject<number>(0);
    private _order = new BehaviorSubject<IOrder>({
        id: 0,
        status: 0,
        total: 0,
        vendor_id: 0,
        order_list: [],
    });

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
        if (localStorage.getItem('order')) {
            orders = <IOrder[]>JSON.parse(localStorage.getItem('order')!);
        }
        orders.push(order);
        localStorage.setItem('order', JSON.stringify(orders));
    }

    public getOrders(user: IUser): IOrder[] {
        let orders: IOrder[] = [];
        if (localStorage.getItem('order')) {
            orders = <IOrder[]>JSON.parse(localStorage.getItem('order')!);
        }

        if (user.type !== 0) {
            return orders.filter((order: IOrder) => order.vendor_id == user.id);
        } else {
            return orders;
        }
    }

    public getStatus(id: number): string {
        let status: IStatus = this._status.find((status) => status.id === id)!
        return status.label;
    }

    public getStatusColor(id: number): string {
        let status: IStatus = this._status.find((status) => status.id === id)!
        return status.color;
    }

    public resetOrder(): void {
        let order: IOrder = {
            id: 0,
            status: 0,
            total: 0,
            vendor_id: 0,
            order_list: [],
        };
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
