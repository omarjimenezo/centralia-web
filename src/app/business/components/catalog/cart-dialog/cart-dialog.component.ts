import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CatalogService } from 'src/app/business/services/catalog.service';
import { IResponse } from 'src/app/common/models/common.model';
import { GlobalConstants } from 'src/app/common/models/global.constants';
import { IOrder, IOrderList } from 'src/app/common/models/order.model';
import { IUser } from 'src/app/common/models/user.model';
import { AlertService } from 'src/app/common/services/alert.service';
import { DataService } from 'src/app/common/services/data.service';
import { OrderService } from '../../../../common/services/order.service';

@Component({
    selector: 'cart-dialog',
    templateUrl: './cart-dialog.component.html',
    styleUrls: ['./cart-dialog.component.scss'],
})
export class CartDialogComponent implements OnInit, OnDestroy {
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
        @Inject(MAT_DIALOG_DATA) public data: { dialogMode: string, orderTotal: number },
        private _global: GlobalConstants,
        private _orderService: OrderService,
        private _catalogService: CatalogService,
        private _alertService: AlertService,
        private _dataService: DataService,
        private _route: ActivatedRoute,
        private _routerService: Router,
    ) { }

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
        if(this._route.snapshot.paramMap.get('id')) {
            this._dataService.setProviderId(parseInt(this._route.snapshot.paramMap.get('id')!))
            this.providerId = parseInt(this._route.snapshot.paramMap.get('id')!);
        }

        this._dataService.getProviderId.subscribe((id) => {
            this.providerId = id;
        })
    }

    public getClient(): void {
        this.userInfo = this._dataService.getUserInfo();
    }

    public saveOrder(): void {
        let saveOrder: IOrder = {
            amount: this.orderTotal,
            provider_id: this.userInfo.vendor_id,
            description: this.order.description,
        };

        this._orderService.saveOrder(saveOrder).subscribe(
            (response: IResponse) => {
                if (response && response.code === 0) {
                    this._alertService.openAlert(
                        this._global.SUCCESS_MESSAGES.ORDER_SAVED,
                        response.code
                    );
                    this._routerService.navigate([this._global.ROUTES.BUSINESS.ORDERS]);
                } else {
                    this._alertService.openAlert(
                        this._global.ERROR_MESSAGES.ORDER_ERROR,
                        response.code
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
        this._catalogService.resetQuantities();
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

    public disableSaveOrderButton(): boolean {
        return this.order.description.length <= 0;
    }
}
