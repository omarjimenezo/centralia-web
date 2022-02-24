import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ICatalog } from '../../models/catalog.model';
import { NavBarService } from '../../services/nav-bar.service';
import { OrderService } from '../../services/order.service';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
    public dataSource: MatTableDataSource<ICatalog>;
    public loading = false;
    public cols: number = 2;
    public orderTotal: number = 0;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _route: ActivatedRoute,
        private _orderService: OrderService,
        private _navBarService: NavBarService
    ) {}

    public ngOnInit(): void {
        this.setProviderId();
        this.getTotal();
    }

    public setProviderId(): void {
        const urlParam: string = this._route.snapshot.paramMap.get('id')!;
        this._navBarService.setProviderId(urlParam);
    }

    public getTotal(): void {
        this._orderService.getTotal.subscribe((total) => this.orderTotal = total);
    }
}
