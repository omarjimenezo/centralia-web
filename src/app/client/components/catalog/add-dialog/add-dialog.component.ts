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
        return this.data.quantity! < 1 || !this.data.quantity
    }

    public calculateTotal() {
        if (this.data.quantity && this.data.quantity > 0) {
            this.productTotal = this.data.quantity * this.data.price;
        }
    }

    public addProduct(): void {
        if (this.data.quantity && this.data.quantity > 0) {
            this.dialogRef.close(this.data.quantity);
            this.data.selected = true;
            this._orderService.addProduct(this.data.quantity, this.data);
        }
    }

    public removeProduct() {
        this.dialogRef.close();
        this.data.selected = false;
        this.data.quantity = 0;
        this._orderService.removeProduct(this.data.id);
    }

    public onCancelClick(): void {
        this.dialogRef.close();
        this.data.quantity = 0;
    }
}
