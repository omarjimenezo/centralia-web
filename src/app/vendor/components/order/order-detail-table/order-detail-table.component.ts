import { Component, OnDestroy, OnInit } from '@angular/core';
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
    public order: IOrder[] = [];
    public catalog: ICatalog[] = [];
    public loading: boolean;

    private sub_order: Subscription;
    private sub_catalog: Subscription;

    public displayedColumns: string[] = ['product', 'quantity', 'actions'];
    public dataSource: MatTableDataSource<IOrder>;

    constructor(
        private _orderService: OrderService,
        private _catalogService: CatalogService
    ) {
        const ORDER_LIST: IOrder[] = [
            {
                "sku": "1276-1",
                "description": "JABON LEON ALOE .350/20",
                "price": "14.61",
                "quantity": 10
            },
            {
                "sku": "3613",
                "description": "T4N6 S4B1L4",
                "price": "26.55",
                "quantity": 10
            },
            {
                "sku": "5009",
                "description": "AVENA 3 MIN. BOTE .400/36",
                "price": "22.38",
                "quantity": 10
            },
            {
                "sku": "1453-1",
                "description": "L3CH3ER4 9O",
                "price": "7.65",
                "quantity": 100
            },
            {
                "sku": "4030",
                "description": "4CEITE 0LIV4 C4RBON31L .250/12",
                "price": "54.98",
                "quantity": 200
            },
            {
                "sku": "9493",
                "description": "PASTA BARILLA FETTUCCINE .500/25",
                "price": "498.89",
                "quantity": 50
            },
            {
                "sku": "0010",
                "description": "105 VELADORAS",
                "price": "0.00",
                "quantity": 1
            },
            {
                "sku": "9039",
                "description": "CONTENEDOR REYMA 1/2 LTO. 20/25 UD.",
                "price": "44.97",
                "quantity": 50
            }
        ];

        this.dataSource = new MatTableDataSource<IOrder>(ORDER_LIST);
    }

    ngOnInit(): void {
        // this.getOrder();
        // this.getCatalog();
    }

    public ngOnDestroy(): void {
        this.sub_order ? this.sub_order.unsubscribe() : null;
        this.sub_catalog ? this.sub_catalog.unsubscribe() : null;
    }

    public getOrder(): void {
        this.loading = true;
        this._orderService.getOrder.subscribe(
            (order: IOrder[]) => {
                this.order = order;
                this.dataSource = new MatTableDataSource<IOrder>(order);
            },
            (error: any) => {
                console.error(error);
                this.loading = false;
            }
        );
    }

    public getCatalog(): void {
        this._catalogService.getCatalog.subscribe((catalog) => {
            this.catalog = catalog;
        });
    }

    public removeProduct(sku: string): void {
        this.catalog.map((product) => {
            if (product.sku === sku) {
                product.selected = false;
                product.quantity = 0;
            }
        });

        this._orderService.removeProduct(sku);
        this._catalogService.setCatalog(this.catalog);
    }
}
