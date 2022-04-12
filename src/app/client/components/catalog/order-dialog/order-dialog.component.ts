import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IAlertInfo } from 'src/app/client/models/alert.model';
import { IOrder, IOrderList } from 'src/app/common/models/order.model';
import { IUser } from 'src/app/common/models/user.model';
import { AlertService } from 'src/app/common/services/alert.service';
import { OrderService } from '../../../../common/services/order.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IResponse } from 'src/app/auth/models/auth.model';
import { GlobalConstants } from 'src/app/common/models/global.constants';

@Component({
    selector: 'order-dialog',
    templateUrl: './order-dialog.component.html',
    styleUrls: ['./order-dialog.component.scss'],
})
export class OrderDialogComponent implements OnInit, OnDestroy {
    public orderList: IOrderList[];
    public userInfo: IUser;
    public order: IOrder;
    public orderTotal: number = 0;
    public loading: boolean = false;
    public client_address: string = '';
    public client_name: string = '';
    public providerId: number;

    private sub_order: Subscription;
    private sub_total: Subscription;

    public displayedColumns: string[] = ['product', 'quantity', 'actions'];
    public dataSource: MatTableDataSource<IOrderList>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {dialogMode: string, orderTotal: number},
        private _global: GlobalConstants,
        private _orderService: OrderService,
        private _alertService: AlertService,
        private _authService: AuthService,
        private _route: ActivatedRoute
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
                    this.order.description
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
        this.userInfo = this._authService.getUserInfo();
    }

    public saveOrder(): void {

        let saveOrder: IOrder = {
            amount: this.orderTotal,
            provider_id: 3,
            description: this.order.description,
        };

        this._orderService.saveOrder(saveOrder).subscribe(
            (response: IResponse) => {
                if (
                    response &&
                    response.message &&
                    response.message === this._global.API_MESSAGES.SUCCESS
                ) {
                    this._alertService.openAlert(
                        this._global.SUCCESS_MESSAGES.ORDER_SAVED,
                        0
                    );
                    this.resetOrder();
                } else {
                    this._alertService.openAlert(
                        this._global.ERROR_MESSAGES.ORDER_ERROR,
                        1
                    );
                }
            },
            (error) => {
                console.error(error);
                this._alertService.openAlert(
                    this._global.ERROR_MESSAGES.ORDER_ERROR,
                    1
                );
            }
        );
    }

    public resetOrder(): void {
        this._orderService.resetOrder();
        this.client_name = '';
        this.client_address = '';
    }
    public deleteProduct(id: number): void {
        const orderList = this.order.description.filter((product) => {
            return product.product.id !== id;
        });

        this.order.description = orderList;

        this._orderService.setOrder(this.order);
    }

    public getTotal(): void {
        this._orderService.getTotal.subscribe(
            (total) => (this.orderTotal = total)
        );
    }
}
