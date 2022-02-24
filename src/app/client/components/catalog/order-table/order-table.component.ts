import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ICatalog, IOrder } from 'src/app/client/models/catalog.model';
import { OrderService } from 'src/app/client/services/order.service';

@Component({
    selector: 'order-table',
    templateUrl: './order-table.component.html',
    styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent implements OnInit {
    public order: IOrder[] = [];
    public loading: boolean;

    public displayedColumns: string[] = ['product', 'quantity', 'actions'];
    public dataSource: MatTableDataSource<IOrder>;

    constructor(private _orderService: OrderService) {}

    ngOnInit(): void {
        this.getOrder();
    }

    public getOrder(): void {
        this.loading = true;
        this._orderService.getOrder.subscribe(
            (order: IOrder[]) => {
                this.dataSource = new MatTableDataSource<IOrder>(order);
            },
            (error: any) => {
                console.error(error);
                this.loading = false;
            }
        );
    }

    public deleteProduct(sku: string): void {
        this.order = this.order.filter((product) => {
            return product.sku !== sku;
        });

        this._orderService.setOrder(this.order);
        this._orderService.calcTotal();
    }
}
