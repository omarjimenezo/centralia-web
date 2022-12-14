import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { IOrder } from 'src/app/common/models/order.model';
import { AddDialogComponent } from '../../add-dialog/add-dialog.component';

@Component({
    selector: 'app-providers-list',
    templateUrl: './providers-list.component.html',
    styleUrls: ['./providers-list.component.scss']
})
export class ProvidersListComponent implements OnInit {
    @Output() providerSelected = new EventEmitter();

    public orderList: IOrder[];

    constructor(
        private _cookieService: CookieService,
        public dialogRef: MatDialogRef<AddDialogComponent>,
    ) { }

    ngOnInit(): void {
        if (this._cookieService.get('orderList')) {
            this.orderList = JSON.parse(this._cookieService.get('orderList'));
        }
    }

    public providerClick(providerId: string): void {
        this.providerSelected.emit(providerId);
    }
}
