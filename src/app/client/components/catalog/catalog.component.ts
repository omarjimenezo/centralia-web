import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ICatalog, IOrder } from '../../models/catalog.model';
import { NavBarService } from '../../services/nav-bar.service';
import { OrderService } from '../../services/order.service';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
    public order: IOrder[];
    public dataSource: MatTableDataSource<ICatalog>;
    public loading: boolean = false;
    public buttonFadeOut: boolean = false;
    public cols: number = 2;
    public orderTotal: number = 0;
    public productsAdded: number = 0;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _route: ActivatedRoute,
        private _orderService: OrderService,
        private _navBarService: NavBarService,
        public dialog: MatDialog
    ) {}

    public ngOnInit(): void {
        this.getOrder();
        this.setProviderId();
        this.getTotal();
    }

    public getOrder(): void {
        this._orderService.getOrder.subscribe(
            (order: IOrder[]) => {
                this.elementFadeout();
                this.order = order;
                this.productsAdded = 0;
                order.forEach((product) => {
                    this.productsAdded += product.quantity;
                });
            },
            (error: any) => {
                console.error(error);
                this.loading = false;
            }
        );
    }

    public setProviderId(): void {
        const urlParam: string = this._route.snapshot.paramMap.get('id')!;
        this._navBarService.setProviderId(urlParam);
    }

    public getTotal(): void {
        this._orderService.getTotal.subscribe(
            (total) => (this.orderTotal = total)
        );
    }

    public openOrderDialog(): void {
        const dialogRef = this.dialog.open(OrderDialogComponent, {
            width: '99%',
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog closed: ${result}`);
        });
    }

    public elementFadeout(): void {
        this.buttonFadeOut = true;
        setTimeout(() => {
            this.buttonFadeOut = false;
        }, 300);
    }
}
