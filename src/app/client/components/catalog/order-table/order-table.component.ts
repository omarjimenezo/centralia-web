import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ICatalog, IOrder } from 'src/app/client/models/catalog.model';
import { CatalogService } from 'src/app/client/services/catalog.service';
import { OrderService } from 'src/app/client/services/order.service';

@Component({
    selector: 'order-table',
    templateUrl: './order-table.component.html',
    styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent implements OnInit {
    public order: IOrder[] = [];
    public catalog: ICatalog[] = [];
    public loading: boolean;

    public displayedColumns: string[] = ['product', 'quantity', 'actions'];
    public dataSource: MatTableDataSource<IOrder>;

    constructor(
        private _orderService: OrderService,
        private _catalogService: CatalogService
    ) {}

    ngOnInit(): void {
        this.getOrder();
        this.getCatalog();
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
            this.catalog = catalog
        })
    }

    public deleteProduct(sku: string): void {
        this.order = this.order.filter((product) => {
            return product.sku !== sku;
        });

        
        this.catalog.map((product) => {
            if(product.sku === sku) {
                product.selected = false
                product.quantity = 1;
            }
        })
        
        this._catalogService.setCatalog(this.catalog);
        this._orderService.setOrder(this.order);
        this._orderService.calcTotal();
    }
}
