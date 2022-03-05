import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { IOrder, IOrderList } from 'src/app/common/models/order.model';
import { OrderService } from '../../../../common/services/order.service';

@Component({
    selector: 'order-dialog',
    templateUrl: './order-dialog.component.html',
    styleUrls: ['./order-dialog.component.scss'],
})
export class OrderDialogComponent implements OnInit, OnDestroy {
    public order: IOrder[];
    public loading: boolean = false;
    public orderTotal: number = 0;
    public client_address: string = '';
    public client_name: string = '';

    private sub_order: Subscription;
    private sub_total: Subscription;

    public displayedColumns: string[] = ['product', 'quantity', 'actions'];
    public dataSource: MatTableDataSource<IOrder>;

    constructor(private _orderService: OrderService) {}

    public ngOnInit(): void {
        this.getOrder();
        this.getTotal();
    }

    public ngOnDestroy(): void {
        this.sub_order ? this.sub_order.unsubscribe() : null;
        this.sub_total ? this.sub_total.unsubscribe() : null;
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

    public deleteProduct(sku: string): void {
        this.order = this.order.filter((product) => {
            return product.sku !== sku;
        });

        this._orderService.setOrder(this.order);
    }

    public getTotal(): void {
        this._orderService.getTotal.subscribe(
            (total) => (this.orderTotal = total)
        );
    }
}
