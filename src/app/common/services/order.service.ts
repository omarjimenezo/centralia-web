import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
    IOrder,
    IOrderList,
    IOrderResponse,
    IOrderStatusCatalog,
    IOrderStatusRequest
} from 'src/app/common/models/order.model';
import { AlertService } from 'src/app/common/services/alert.service';
import { IAlertInfo } from '../../business/models/alert.model';
import { IProduct } from '../models/product.model';
import { IResponse } from '../models/common.model';
import { GlobalConstants } from '../models/global.constants';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private _total = new BehaviorSubject<number>(0);
    private _order = new BehaviorSubject<IOrder>({
        id: '',
        status: 0,
        amount: 0,
        provider_id: '',
        description: [],
    });
    private _orders = new BehaviorSubject<IOrder[]>([]);

    constructor(
        private _alertService: AlertService,
        private _http: HttpClient,
        private _dataService: DataService,
        private _global: GlobalConstants,
    ) {}

    // Order
    public setOrder(order: IOrder) {
        this._order.next(order);
    }

    get getOrder(): Observable<IOrder> {
        return this._order.asObservable();
    }

    // Orders
    public setOrders(orders: IOrder[]) {
        this._orders.next(orders);
    }

    get getStoredOrders(): IOrder[] {
        return this._orders.value;
    }

    public saveOrder(order: IOrder): Observable<any> {
        return this._http.post<IOrder>(
            `${this._global.ENDPOINTS.ORDER.POST_ORDER}`,
            order
        );
    }

    public getProviderOrders(): Observable<IOrderResponse> {
        return this._http.get<IOrderResponse>(
            `${this._global.ENDPOINTS.ORDER.GET_PROVIDER_ORDERS}`
        );
    }

    public getBusinessOrders(): Observable<IOrderResponse> {
        return this._http.get<IOrderResponse>(
            `${this._global.ENDPOINTS.ORDER.GET_BUSINESS_ORDERS}`
        );
    }

    public updateOrderStatus(request: IOrderStatusRequest): Observable<IResponse> {
        return this._http.put<IResponse>(
            `${this._global.ENDPOINTS.ORDER.UPDATE_ORDER_STATUS}`,
            request
        );
    }

    public getStatus(orderStatus: number): string {
        let status: any;
        const _status: IOrderStatusCatalog[] = this._dataService._getOrderStatusCatalog();
        if(_status) {
            status = _status.find((status) => status.id === orderStatus)!;
        }
        return status.description;
    }

    public getStatusColor(orderStatus: number): string {
        let status: any;
        const _status: IOrderStatusCatalog[] = this._dataService._getOrderStatusCatalog();
        if(_status) {
            status = _status.find((status) => status.id === orderStatus)!;
        }
        return status.color;
    }

    public resetOrder(): void {
        let order: IOrder = {
            id: '',
            status: 0,
            amount: 0,
            provider_id: '',
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
            total += product.product.price! * product.quantity;
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

    public addProduct(quantity: number, element: IProduct): void {
        const order = this._order.value;
        const productFound = order.description.find(
            (product) => product.product.id === element.id
        );
        const alertInfo: IAlertInfo = { screen: 'catalog', type: 'success' };

        if (productFound) {
            productFound.quantity = quantity;
        } else {

            order.description.push({
                product: {
                    id: element.id,
                    name: element.descripcion,
                    price: element.precio,
                },
                quantity: quantity,
            });
        }
        console.log('Order: ', order);
        this.setOrder(order);
        this.calcTotal();
        this._alertService.openAlert(`Se agregaron ${quantity} productos`, 0);
    }

    public removeProduct(id: string) {
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
