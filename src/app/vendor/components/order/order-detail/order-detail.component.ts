import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalConstants, ORDER_STATUS } from 'src/app/common/models/global.constants';
import { IOrder } from 'src/app/common/models/order.model';
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
    ) {}

    public ngOnInit(): void {}

    public enableActionButton(buttonStatus: string): boolean {
        return (buttonStatus === this.order.status)
    }
}