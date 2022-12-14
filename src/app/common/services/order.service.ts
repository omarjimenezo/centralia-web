import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
    IOrder,
    IOrderProduct,
    IOrderResponse,
    IOrderStatusCatalog,
    IOrderStatusRequest
} from 'src/app/common/models/order.model';
import { AlertService } from 'src/app/common/services/alert.service';
import { IAlertInfo } from '../../business/models/alert.model';
import { IBusinessProducts, IProduct } from '../models/product.model';
import { IResponse } from '../models/common.model';
import { GlobalConstants } from '../models/global.constants';
import { DataService } from './data.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private _total = new BehaviorSubject<number>(0);
    private _order = new BehaviorSubject<IOrder>({
        id: '',
        estatus: { id: 0, nombre: '' },
        total: 0,
        proveedor_id: '',
        productos: [],
    });
    private _orders = new BehaviorSubject<IOrder[]>([]);

    constructor(
        private _alertService: AlertService,
        private _http: HttpClient,
        private _dataService: DataService,
        private _cookieService: CookieService,
        private _global: GlobalConstants,
    ) { }

    // Products
    public addProduct(providerId: string, product: IOrderProduct): void {
        let order: IOrder = this.getOrder(providerId)!;

        const productFound = order.productos.find(
            (orderProduct: IOrderProduct) => orderProduct.producto.id === product.producto.id
        );

        if (productFound) {
            productFound.cantidad = product.cantidad;
        } else {
            order.productos.push({
                producto: product.producto,
                precio: product.precio,
                cantidad: product.cantidad,
            });
        }

        console.log('Order: ', order);
        this.setOrder(order, providerId);
        this._alertService.openAlert(`Se agregaron ${product.cantidad} productos`, 0);
    }


    public removeProduct(id: string, providerId: string) {
        let order: IOrder = this._order.value;
        const alertInfo: IAlertInfo = { screen: 'catalog', type: 'success' };
        const producto = order.productos.find(
            (orderProduct) => orderProduct.producto.id === id
        );

        const orderList = order.productos.filter(
            (orderProduct) => orderProduct.producto.id !== id
        );

        order.productos = orderList;

        this.setOrder(order, providerId);
        this.calcTotal(order);
        this._alertService.openAlert(
            `Se quitaron ${producto?.cantidad} productos`,
            0
        );

        if (order.productos.length <= 0) {
            const alertInfo: IAlertInfo = { screen: 'catalog', type: 'info' };
            setTimeout(() => {
                this._alertService.openAlert(`0 productos en su orden`, 3);
            }, 3100);
        }
    }

    // Order
    public setOrder(order: IOrder, providerId: string) {
        let orderList: IOrder[] = this.getOrderList(providerId);

        orderList.map((providerOrder) => {
            if (providerOrder.proveedor_id === providerId) {
                providerOrder.productos = order.productos
                providerOrder.total = this.calcTotal(order)
            }
        });
        this._cookieService.set('orderList', JSON.stringify(orderList), undefined, '/')
    }

    public getOrderList(providerId: string): IOrder[] {
        let orderList: IOrder[];

        if(this._cookieService.get('orderList')) {
            orderList = JSON.parse(this._cookieService.get('orderList'));
        } else {
            orderList = [{
                productos: [],
                proveedor_id: providerId,
                total: 0,
            }]
        }

        return orderList;
    }

    public getOrder(providerId: string): IOrder {
        let orderList: IOrder[];

        if(this._cookieService.get('orderList')) {
            orderList = JSON.parse(this._cookieService.get('orderList'));
        } else {
            orderList = [{
                productos: [],
                proveedor_id: providerId,
                total: 0,
            }];
            this._cookieService.set('orderList', JSON.stringify(orderList), undefined, '/');
        }

        let order = orderList.find((orderProvider) => {
            return orderProvider.proveedor_id === providerId
        });

        if (order) {
            return order
        } else {
            order = {
                productos: [],
                proveedor_id: providerId,
                total: 0,
            }

            orderList.push(order);
            this._cookieService.set('orderList', JSON.stringify(orderList), undefined, '/');
            return order
        }
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
        if (_status) {
            status = _status.find((status) => status.id === orderStatus)!;
        }
        return status.description;
    }

    public getStatusColor(orderStatus: number): string {
        let status: any;
        const _status: IOrderStatusCatalog[] = this._dataService._getOrderStatusCatalog();
        if (_status) {
            status = _status.find((status) => status.id === orderStatus)!;
        }
        return status.color;
    }

    // Total

    public calcTotal(order: IOrder): number {
        let total = 0;
        order.productos.forEach((producto: IOrderProduct) => {
            total += producto.precio! * producto.cantidad!;
        });
        this.setTotal(total);
        return total;
    }

    public setTotal(total: number) {
        this._total.next(total);
    }

    get getTotal(): Observable<number> {
        return this._total.asObservable();
    }

    public resetOrder(providerId: string): void {
        let order: IOrder = {
            id: '',
            total: 0,
            proveedor_id: providerId,
            productos: [],
        };
        this.setOrder(order, providerId);
        this.calcTotal(order);
    }
}
