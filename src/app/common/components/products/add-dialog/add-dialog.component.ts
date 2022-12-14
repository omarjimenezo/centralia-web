import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IOrderProduct } from 'src/app/common/models/order.model';
import { IBusinessProducts } from 'src/app/common/models/product.model';
import { DataService } from 'src/app/common/services/data.service';
import { OrderService } from 'src/app/common/services/order.service';

@Component({
    selector: 'add-dialog',
    templateUrl: './add-dialog.component.html',
    styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent {
    public productTotal: number = 0;
    public providerId: string = '';

    constructor(
        private _orderService: OrderService,
        private _dataService: DataService,
        public dialogRef: MatDialogRef<AddDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public orderProduct: IOrderProduct
    ) {
        this._dataService.getProviderId.subscribe((providerId) => {
            this.providerId = providerId;
        });
    }

    public addProduct(): void {
        if (this.orderProduct.cantidad && this.orderProduct.cantidad) {
            this._orderService.addProduct(this.providerId, this.orderProduct);
            this.dialogRef.close(this.orderProduct.cantidad);
        }
    }

    public cancel() {
        this.dialogRef.close();
        // this.orderProduct.cantidad = 0;
        // this._orderService.removeProduct(this.orderProduct.producto.id, this.providerId);
    }

    public disableAddProductButton(): boolean {
        return this.orderProduct.cantidad! < 1 || !this.orderProduct.cantidad
    }

    public calculateTotal() {
        if (this.orderProduct.cantidad && this.orderProduct.cantidad > 0) {
            this.productTotal = this.orderProduct.cantidad * this.orderProduct.precio;
        }
    }

    public onCancelClick(): void {
        this.dialogRef.close();
        this.orderProduct.cantidad = 0;
    }
}
