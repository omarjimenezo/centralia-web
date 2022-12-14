import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { IOrder } from 'src/app/common/models/order.model';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
    selector: 'app-orders-dialog',
    templateUrl: './orders-dialog.component.html',
    styleUrls: ['./orders-dialog.component.scss']
})
export class OrdersDialogComponent implements OnInit {
    public orderList: IOrder[];
    public step: number = 1;
    public providerId: string;

    constructor(
        private _cookieService: CookieService,
        public dialogRef: MatDialogRef<AddDialogComponent>,
    ) { }

    ngOnInit(): void {
        if (this._cookieService.get('orderList')) {
            this.orderList = JSON.parse(this._cookieService.get('orderList'));
        }
    }

    public providerSelected(providerId: string): void {
        this.step = 2
        this.providerId = providerId;
    }

    public backButton(): void {
        this.step = 1;
    }
}
