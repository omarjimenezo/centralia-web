import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { IDependencyResponse } from 'src/app/auth/models/auth.model';
import { GlobalConstants } from 'src/app/common/models/global.constants';
import { IOrder } from 'src/app/common/models/order.model';
import { IUser } from 'src/app/common/models/user.model';
import { AlertService } from 'src/app/common/services/alert.service';
import { DataService } from 'src/app/common/services/data.service';
import { ICatalog } from '../../../common/models/catalog.model';
import { OrderService } from '../../../common/services/order.service';
import { NavBarService } from '../../services/nav-bar.service';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit, OnDestroy {
    public order: IOrder;
    public dataSource: MatTableDataSource<ICatalog>;
    public loading: boolean = false;
    public buttonFadeOut: boolean = false;
    public cols: number = 2;
    public orderTotal: number = 0;
    public productsAdded: number = 0;
    public client_address: string = '';
    public client_name: string = '';
    public providerId: number;
    public userInfo: IUser;

    private sub_order: Subscription;
    private sub_total: Subscription;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _dataService: DataService,
        private _orderService: OrderService,
        private _global: GlobalConstants,
        private _navBarService: NavBarService,
        private _cookieService: CookieService,
        public _alertService: AlertService,
        public _matDialog: MatDialog,
    ) { }

    public ngOnInit(): void {
        this.getOrder();
        this.getTotal();
        this.getProviderId();
    }

    public ngOnDestroy(): void {
        this.sub_order ? this.sub_order.unsubscribe() : null;
        this.sub_total ? this.sub_total.unsubscribe() : null;
    }

    public getProviderId(): void {
        let userInfo: IUser = JSON.parse(this._cookieService.get('userInfo'))
        let providerId: string = this._activatedRoute.snapshot.paramMap.get('id')!
        this._dataService.setProviderId(providerId);

        this._dataService.getDependencyBySubId(userInfo.id).subscribe(
            (dependency: IDependencyResponse) => {
                (dependency && dependency.data && dependency.data.length > 0) ? this._dataService.setVendorId(dependency.data[0].sup_user_id) : this._dataService.setVendorId(providerId)
                this.loading = false;
            },
            (error) => {
                this._alertService.openAlert(
                    this._global.ERROR_MESSAGES.CONNECTION_ERROR,
                    1
                );
                console.error(error);
                this.loading = false;
            }
        );
    }

    public getOrder(): void {
        this.sub_order = this._orderService.getOrder.subscribe(
            (order: IOrder) => {
                this.elementFadeout();
                this.order = order;
                this.productsAdded = 0;
                order.description.forEach((product) => {
                    this.productsAdded += product.quantity;
                });
            },
            (error: any) => {
                console.error(error);
                this.loading = false;
            }
        );
    }

    public getClient(): void {
        this.userInfo = this._dataService.getUserInfo();
    }

    public resetOrder(): void {
        this._orderService.resetOrder();
        this.client_name = '';
        this.client_address = '';
    }

    public getTotal(): void {
        this.sub_total = this._orderService.getTotal.subscribe(
            (total) => (this.orderTotal = total)
        );
    }

    public openOrderDialog(): void {
        const dialogRef = this._matDialog.open(OrderDialogComponent, {
            data: { dialogMode: true },
            width: '99%',
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog closed: ${result}`);
        });
    }

    public elementFadeout(): void {
        this.buttonFadeOut = true;
        setTimeout(() => {
            this.buttonFadeOut = false;
        }, 300);
    }
}
