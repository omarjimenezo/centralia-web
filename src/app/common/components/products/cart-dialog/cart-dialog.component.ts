import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginComponent } from 'src/app/auth/components/login/login.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CatalogService } from 'src/app/business/services/catalog.service';
import { IResponse } from 'src/app/common/models/common.model';
import { GlobalConstants } from 'src/app/common/models/global.constants';
import { IOrder, IOrderList } from 'src/app/common/models/order.model';
import { IUser } from 'src/app/common/models/user.model';
import { AlertService } from 'src/app/common/services/alert.service';
import { DataService } from 'src/app/common/services/data.service';
import { OrderService } from '../../../services/order.service';

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
    public providerId: string;

    private sub_order: Subscription;
    private sub_total: Subscription;

    public displayedColumns: string[] = ['product', 'quantity', 'actions'];
    public dataSource: MatTableDataSource<IOrderList>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { dialogMode: string, orderTotal: number },
        private _global: GlobalConstants,
        private _autService: AuthService,
        private _orderService: OrderService,
        private _catalogService: CatalogService,
        private _alertService: AlertService,
        private _dataService: DataService,
        private _route: ActivatedRoute,
        private _routerService: Router,
        public dialog: MatDialog,
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
            this._dataService.setProviderId(this._route.snapshot.paramMap.get('id')!)
            this.providerId = this._route.snapshot.paramMap.get('id')!;
        }

        this._dataService.getProviderId.subscribe((id) => {
            this.providerId = id;
        })
    }

    public getClient(): void {
        this.userInfo = this._dataService.getUserInfo();
    }

    public saveOrder(): void {
        if (this._autService.isAuthenticated()) {
            let saveOrder: IOrder = {
                amount: this.orderTotal,
                provider_id: this.providerId,
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
                        this.resetOrder();
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
        } else {
            this.openLoginDialog();
        }
    }

    openLoginDialog(): void {
        const dialogRef = this.dialog.open(LoginComponent, {
          width: '350px',
          data: {returnURL: `${this._global.ROUTES.BUSINESS.PRODUCTS}/${parseInt(this._route.snapshot.paramMap.get('id')!)}`},
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }

    public resetOrder(): void {
        this._orderService.resetOrder();
        this._catalogService.resetQuantities();
        this.client_name = '';
        this.client_address = '';
    }

    public deleteProduct(id: string): void {
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
