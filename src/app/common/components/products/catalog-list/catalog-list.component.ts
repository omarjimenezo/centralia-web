import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IBusinessProducts } from 'src/app/common/models/product.model';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
    selector: 'catalog-list',
    templateUrl: './catalog-list.component.html',
    styleUrls: ['./catalog-list.component.scss'],
})
export class CatalogListComponent implements OnInit {
    @Input() displayCatalog: IBusinessProducts[];
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