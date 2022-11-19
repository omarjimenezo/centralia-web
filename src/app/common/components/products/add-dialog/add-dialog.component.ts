import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICatalog } from 'src/app/common/models/catalog.model';
import { OrderService } from 'src/app/common/services/order.service';

@Component({
    selector: 'add-dialog',
    templateUrl: './add-dialog.component.html',
    styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent {
    public productTotal = 0;

    constructor(
        private _orderService: OrderService,
        public dialogRef: MatDialogRef<AddDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ICatalog
    ) {}

    public disableAddProductButton(): boolean {
        return this.data.cantidad! < 1 || !this.data.cantidad
    }

    public calculateTotal() {
        if (this.data.cantidad && this.data.cantidad > 0) {
            this.productTotal = this.data.cantidad * this.data.precio;
        }
    }

    public addProduct(): void {
        if (this.data.cantidad && this.data.cantidad > 0) {
            this.dialogRef.close(this.data.cantidad);
            this._orderService.addProduct(this.data.cantidad, this.data);
        }
    }

    public removeProduct() {
        this.dialogRef.close();
        this.data.cantidad = 0;
        this._orderService.removeProduct(this.data.id);
    }

    public onCancelClick(): void {
        this.dialogRef.close();
        this.data.cantidad = 0;
    }
}
