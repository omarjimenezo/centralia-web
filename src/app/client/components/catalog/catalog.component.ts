import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IOrder } from 'src/app/common/models/order.model';
import { IClient } from 'src/app/common/models/user.model';
import { AlertService } from 'src/app/common/services/alert.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { ICatalog } from '../../../common/models/catalog.model';
import { OrderService } from '../../../common/services/order.service';
import { IAlertInfo } from '../../models/alert.model';
import { CatalogService } from '../../services/catalog.service';
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
    public clientInfo: IClient;

    private sub_order: Subscription;
    private sub_total: Subscription;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _orderService: OrderService,
        private _catalogService: CatalogService,
        private _navBarService: NavBarService,
        public _alertService: AlertService,
        public _matDialog: MatDialog,
    ) {}

    public ngOnInit(): void {
        this.getOrder();
        this.getTotal();
        this.setProviderId();
        this.getClient();
    }

    public ngOnDestroy(): void {
        (this.sub_order) ? this.sub_order.unsubscribe() : null;
        (this.sub_total) ? this.sub_total.unsubscribe() : null;
    }

    public setProviderId(): void {
        this._navBarService.setProviderId(this._activatedRoute.snapshot.paramMap.get('id')!);
    }

    public getOrder(): void {
        this.sub_order = this._orderService.getOrder.subscribe(
            (order: IOrder) => {
                this.elementFadeout();
                this.order = order;
                this.productsAdded = 0;
                order.order_list.forEach((product) => {
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
        this.clientInfo = this._authService.getClient
    }

    public saveOrder(): void {
        const alertInfo: IAlertInfo = { screen: 'catalog', type: 'success' };
        
        let saveOrder: IOrder = {
            id: 1,
            status: 2,
            date: new Date(),
            total: this.orderTotal,
            client_address: this.client_address,
            client_name: this.client_name,
            vendor_id: this.clientInfo.vendorId,
            order_list: this.order.order_list
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

    public getTotal(): void {
        this.sub_total = this._orderService.getTotal.subscribe(
            (total) => (this.orderTotal = total)
        );
    }

    public openOrderDialog(): void {
        const dialogRef = this._matDialog.open(OrderDialogComponent, {
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
