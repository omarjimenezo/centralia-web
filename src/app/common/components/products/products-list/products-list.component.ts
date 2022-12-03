import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IBusinessProducts } from 'src/app/common/models/product.model';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
    selector: 'products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
    @Input() displayProducts: IBusinessProducts[];
    @Input() productFade: boolean;

    constructor(public dialog: MatDialog) {}

    public ngOnInit(): void {}

    public openAddDialog(product: IBusinessProducts): void {
        const dialogRef = this.dialog.open(AddDialogComponent, {
            data: product,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if(result < 1) {
                product.cantidad = 0
            }
        });
    }
}
