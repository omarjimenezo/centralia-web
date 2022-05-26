import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IResponse } from 'src/app/common/models/common.model';
import { GlobalConstants } from 'src/app/common/models/global.constants';
import { IOrder, IOrderStatusRequest } from 'src/app/common/models/order.model';
import { OrderService } from 'src/app/common/services/order.service';

@Component({
    selector: 'order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {

    public loading: boolean = false;

    constructor(
        public _global: GlobalConstants,
        public _orderService: OrderService,
        public dialogRef: MatDialogRef<OrderDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public order: IOrder
    ) { }

    public ngOnInit(): void { }

    public enableActionButton(buttonStatus: number): boolean {
        return (buttonStatus === this.order.status)
    }

    public onChangeStatus(status: number): void {
        let orderRequest: IOrderStatusRequest = {
            order_id: this.order.id!,
            status: status
        }

        this._orderService.updateOrderStatus(orderRequest).subscribe((res: IResponse) => {
            if (res && res.code === 0) {
                this._orderService.getStoredOrders.subscribe((orders: IOrder[]) => {
                    let order: IOrder = orders.find((order: IOrder) => order.id === this.order.id)!

                    if (order) {
                        order.status = status
                        this._orderService.setOrders(orders);
                    }
                });
            }
        })
    }
}
