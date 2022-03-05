import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IOrder, IOrderList } from 'src/app/common/models/order.model';
import { ICatalog } from '../../../common/models/catalog.model';
import { NavBarService } from '../../services/nav-bar.service';
import { OrderService } from '../../../common/services/order.service';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit, OnDestroy {
    public order: IOrder[];
    public dataSource: MatTableDataSource<ICatalog>;
    public loading: boolean = false;
    public buttonFadeOut: boolean = false;
    public cols: number = 2;
    public orderTotal: number = 0;
    public productsAdded: number = 0;
    public client_address: string = '';
    public client_name: string = '';

    private sub_order: Subscription;
    private sub_total: Subscription;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _route: ActivatedRoute,
        private _orderService: OrderService,
        private _navBarService: NavBarService,
        public _matDialog: MatDialog
    ) {}

    public ngOnInit(): void {
        this.getOrder();
        this.setProviderId();
        this.getTotal();
    }

    public ngOnDestroy(): void {
        (this.sub_order) ? this.sub_order.unsubscribe() : null;
        (this.sub_total) ? this.sub_total.unsubscribe() : null;
    }


    public getOrder(): void {
        this._orderService.getOrder.subscribe(
            (order: IOrder[]) => {
                this.elementFadeout();
                this.order = order;
                this.productsAdded = 0;
                order.forEach((product) => {
                    this.productsAdded += product.quantity;
                });
            },
            (error: any) => {
                console.error(error);
                this.loading = false;
            }
        );
    }

    public saveOrder(): void {
        let saveOrder: IOrderList = {
            id: 1,
            status: 0,
            total: this.orderTotal,
            client_address: this.client_address,
            client_name: this.client_name,
            vendor_id: 1,
        };

        this._orderService.setOrderList(saveOrder);
    }

    public setProviderId(): void {
        const urlParam: string = this._route.snapshot.paramMap.get('id')!;
        this._navBarService.setProviderId(urlParam);
    }

    public getTotal(): void {
        this._orderService.getTotal.subscribe(
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
