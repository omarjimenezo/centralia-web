import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAlertInfo } from 'src/app/client/models/alert.model';
import { IOrder, IOrderList } from 'src/app/common/models/order.model';
import { IClient } from 'src/app/common/models/user.model';
import { AlertService } from 'src/app/common/services/alert.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { OrderService } from '../../../../common/services/order.service';

@Component({
    selector: 'order-dialog',
    templateUrl: './order-dialog.component.html',
    styleUrls: ['./order-dialog.component.scss'],
})
export class OrderDialogComponent implements OnInit, OnDestroy {
    public orderList: IOrderList[];
    public order: IOrder;
    public loading: boolean = false;
    public orderTotal: number = 0;
    public client_address: string = '';
    public client_name: string = '';
    public providerId: number;
    public clientInfo: IClient;

    private sub_order: Subscription;
    private sub_total: Subscription;

    public displayedColumns: string[] = ['product', 'quantity', 'actions'];
    public dataSource: MatTableDataSource<IOrderList>;

    constructor(
        private _orderService: OrderService,
        private _alertService: AlertService,
        private _authService: AuthService,
        private _route: ActivatedRoute,
    ) {}

    public ngOnInit(): void {
        this.getOrder();
        this.getTotal();
        this.getClient();
        this.getProvider();
    }

    public ngOnDestroy(): void {
        this.sub_order ? this.sub_order.unsubscribe() : null;
        this.sub_total ? this.sub_total.unsubscribe() : null;
    }

    public getOrder(): void {
        this.loading = true;
        this._orderService.getOrder.subscribe(
            (order: IOrder) => {
                this.order = order;
                this.dataSource = new MatTableDataSource<IOrderList>(
                    this.order.order_list
                );
            },
            (error: any) => {
                console.error(error);
                this.loading = false;
            }
        );
    }

    public getProvider(): void {
        this.providerId = parseInt(this._route.snapshot.paramMap.get('id')!);
    }

    public getClient(): void {
        this.clientInfo = this._authService.getClient;
    }

    public saveOrder(): void {
        const alertInfo: IAlertInfo = { screen: 'catalog', type: 'success' };

        let saveOrder: IOrder = {
            id: 1,
            status: 2,
            total: this.orderTotal,
            date: new Date(),
            client_address: this.client_address,
            client_name: this.client_name,
            vendor_id: this.clientInfo.vendorId,
            order_list: this.order.order_list,
        };

        this._orderService.setOrders(saveOrder);
        this._alertService.openAlert('Pedido Enviado', alertInfo);
        this.resetOrder();
    }

    public resetOrder(): void {
        this._orderService.resetOrder();
        this.client_name = '';
        this.client_address = '';
    }
    public deleteProduct(sku: string): void {
        const orderList = this.order.order_list.filter((product) => {
            return product.sku !== sku;
        });

        this.order.order_list = orderList;

        this._orderService.setOrder(this.order);
    }

    public getTotal(): void {
        this._orderService.getTotal.subscribe(
            (total) => (this.orderTotal = total)
        );
    }
}
