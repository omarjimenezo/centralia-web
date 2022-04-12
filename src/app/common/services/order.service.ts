import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import {
    IOrder,
    IOrderList,
    IOrderResponse,
    IStatus,
} from 'src/app/common/models/order.model';
import { AlertService } from 'src/app/common/services/alert.service';
import { ICatalog } from '../models/catalog.model';
import { IAlertInfo } from '../../client/models/alert.model';
import { IUser } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../models/global.constants';
import { IResponse } from 'src/app/auth/models/auth.model';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private _total = new BehaviorSubject<number>(0);
    private _order = new BehaviorSubject<IOrder>({
        id: 0,
        status: '',
        amount: 0,
        provider_id: 0,
        description: [],
    });

    constructor(
        private _alertService: AlertService,
        private _http: HttpClient,
        private _global: GlobalConstants
    ) {}

    // Order
    public setOrder(order: IOrder) {
        this._order.next(order);
    }

    get getOrder(): Observable<IOrder> {
        return this._order.asObservable();
    }

    public saveOrder(order: IOrder): Observable<any> {
        return this._http.post<IOrder>(
            `${this._global.ENDPOINTS.ORDER.POST_ORDER}`,
            order
        );
        // let orders: IOrder[] = [];
        // if (localStorage.getItem('order')) {
        //     orders = <IOrder[]>JSON.parse(localStorage.getItem('order')!);
        // }
        // orders.push(order);
        // localStorage.setItem('order', JSON.stringify(orders));
    }

    public getOrders(): Observable<IOrderResponse> {
        return this._http.get<IOrderResponse>(
            `${this._global.ENDPOINTS.ORDER.GET_ORDERS}`
        );
        // let orders: IOrder[] = [];
        // if (localStorage.getItem('order')) {
        //     orders = <IOrder[]>JSON.parse(localStorage.getItem('order')!);
        // }

        // if (user.type !== 'abarrotera') {
        //     return orders.filter(
        //         (order: IOrder) => order.provider_id == user.id
        //     );
        // } else {
        //     return orders;
        // }
    }

    public getStatus(orderStatus: string): string {
        const _status: IStatus[] = this._global.orderStatusData;
        let status: IStatus = _status.find((status) => status.label === orderStatus)!;
        return status.label;
    }

    public getStatusColor(orderStatus: string): string {
        const _status: IStatus[] = this._global.orderStatusData;
        let status: IStatus = _status.find((status) => status.label === orderStatus)!;
        return status.color;
    }

    public resetOrder(): void {
        let order: IOrder = {
            id: 0,
            status: '',
            amount: 0,
            provider_id: 0,
            description: [],
        };
        this.setOrder(order);
        this.calcTotal();
    }

    // Total

    public calcTotal(): void {
        const order: IOrder = this._order.value;
        let total = 0;
        order.description.forEach((product: IOrderList) => {
            total += parseFloat(product.product.price!) * product.quantity;
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
        const productFound = order.description.find(
            (product) => product.product.id === element.id
        );
        const alertInfo: IAlertInfo = { screen: 'catalog', type: 'success' };

        if (productFound) {
            productFound.quantity = quantity;
        } else {
            element.selected = true;

            order.description.push({
                product: {
                    id: element.id,
                    name: element.description,
                    price: element.price,
                },
                quantity: quantity,
            });
        }
        console.log('Order: ', order);
        this.setOrder(order);
        this.calcTotal();
        this._alertService.openAlert(`Se agregaron ${quantity} productos`, 0);
    }

    public removeProduct(id: number) {
        let order: IOrder = this._order.value;
        const alertInfo: IAlertInfo = { screen: 'catalog', type: 'success' };
        const producto = order.description.find(
            (product) => product.product.id === id
        );

        const orderList = order.description.filter(
            (product) => product.product.id !== id
        );

        order.description = orderList;

        this.setOrder(order);
        this.calcTotal();
        this._alertService.openAlert(
            `Se quitaron ${producto?.quantity} productos`,
            0
        );

        if (order.description.length <= 0) {
            const alertInfo: IAlertInfo = { screen: 'catalog', type: 'info' };
            setTimeout(() => {
                this._alertService.openAlert(`0 productos en su orden`, 3);
            }, 3100);
        }
    }
}
