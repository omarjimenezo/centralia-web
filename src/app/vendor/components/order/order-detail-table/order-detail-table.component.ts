import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CatalogService } from 'src/app/client/services/catalog.service';
import { OrderService } from 'src/app/common/services/order.service';
import { ICatalog } from 'src/app/common/models/catalog.model';
import { IOrder, IOrderList } from 'src/app/common/models/order.model';

@Component({
    selector: 'order-detail-table',
    templateUrl: './order-detail-table.component.html',
    styleUrls: ['./order-detail-table.component.scss'],
})
export class OrderDetailTableComponent implements OnInit, OnDestroy {
    @Input() orderList: IOrderList[];

    public order: IOrder[] = [];
    public catalog: ICatalog[] = [];
    public loading: boolean;

    private sub_order: Subscription;
    private sub_catalog: Subscription;

    public displayedColumns: string[] = ['productPrice', 'product', 'price', 'quantity'];
    public dataSource: MatTableDataSource<IOrderList>;

    constructor(
        private _orderService: OrderService,
        private _catalogService: CatalogService
    ) {
        

        
    }

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource<IOrderList>(this.orderList);
    }

    public ngOnDestroy(): void {
        this.sub_order ? this.sub_order.unsubscribe() : null;
        this.sub_catalog ? this.sub_catalog.unsubscribe() : null;
    }

    // public getOrder(): void {
    //     this.loading = true;
    //     this._orderService.getOrder.subscribe(
    //         (order: IOrder[]) => {
    //             this.order = order;
    //             this.dataSource = new MatTableDataSource<IOrder>(order);
    //         },
    //         (error: any) => {
    //             console.error(error);
    //             this.loading = false;
    //         }
    //     );
    // }

    public getCatalog(): void {
        this._catalogService.getCatalog.subscribe((catalog) => {
            this.catalog = catalog;
        });
    }

    public removeProduct(id: number): void {
        this.catalog.map((product) => {
            if (product.id === id) {
                product.selected = false;
                product.quantity = 0;
            }
        });

        this._orderService.removeProduct(id);
        this._catalogService.setCatalog(this.catalog);
    }
}
