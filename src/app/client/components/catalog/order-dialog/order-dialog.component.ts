import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ICatalog, IOrder } from '../../../models/catalog.model';
import { OrderService } from '../../../services/order.service';

@Component({
    selector: 'order-dialog',
    templateUrl: './order-dialog.component.html',
    styleUrls: ['./order-dialog.component.scss'],
})
export class OrderDialogComponent implements OnInit {
    public order: IOrder[];
    public loading: boolean;
    public orderTotal: number = 0;

    public displayedColumns: string[] = ['product', 'quantity', 'actions'];
    public dataSource: MatTableDataSource<IOrder>;

    constructor(private _orderService: OrderService) {}

    ngOnInit(): void {
        this.getCatalog();
        this.getTotal();
    }

    public getCatalog(): void {
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

    public deleteProduct(sku: string): void {
        this.order = this.order.filter((product) => {
            return product.sku !== sku;
        });

        this._orderService.setOrder(this.order);
    }

    
public getTotal(): void {
        this._orderService.getTotal.subscribe((total) => this.orderTotal = total);
    }
}
