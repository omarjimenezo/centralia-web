import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IOrder } from 'src/app/common/models/order.model';

@Component({
    selector: 'order-detail-table',
    templateUrl: './order-detail-table.component.html',
    styleUrls: ['./order-detail-table.component.scss'],
})
export class OrderDetailTableComponent {
    // @Input() orderList: IOrderList[];

    // public order: IOrder[] = [];
    // public catalog: IBusinessProducts[] = [];
    // public loading: boolean;

    // private sub_order: Subscription;
    // private sub_catalog: Subscription;

    public displayedColumns: string[] = [
        'productPrice',
        'product',
        'price',
        'quantity',
    ];
    public dataSource: MatTableDataSource<IOrder>;

    // constructor(
    //     private _orderService: OrderService,
    //     private _catalogService: CatalogService
    // ) {}

    // ngOnInit(): void {
    //     this.dataSource = new MatTableDataSource<IOrderList>(this.orderList);
    // }

    // public ngOnDestroy(): void {
    //     this.sub_order ? this.sub_order.unsubscribe() : null;
    //     this.sub_catalog ? this.sub_catalog.unsubscribe() : null;
    // }

    // public getCatalog(): void {
    //     this._catalogService.getCatalog.subscribe((catalog: IBusinessProducts[]) => {
    //         this.catalog = catalog;
    //     });
    // }

    // public removeProduct(id: string): void {
    //     this.catalog.map((product) => {
    //         if (product.producto.id === id) {
    //             product.cantidad = 0;
    //         }
    //     });

    //     this._orderService.removeProduct(id);
    //     this._catalogService.setCatalog(this.catalog);
    // }
}
