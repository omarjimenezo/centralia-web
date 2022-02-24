import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CatalogSearchService } from 'src/app/client/services/catalog-search.service';
import { NavBarService } from 'src/app/client/services/nav-bar.service';
import { OrderService } from 'src/app/client/services/order.service';
import { ICatalog, IOrder } from '../../../models/catalog.model';
import { CatalogService } from '../../../services/catalog.service';

@Component({
    selector: 'catalog-table',
    templateUrl: './catalog-table.component.html',
    styleUrls: ['./catalog-table.component.scss'],
})
export class CatalogTableComponent implements OnInit {
    public order: IOrder[] = [];
    public quantities: number[] = [];
    public current_catalog: IOrder[] = [];

    public displayedColumns = ['desktop'];

    @Input() loading: boolean;
    @Input() dataSource: MatTableDataSource<ICatalog>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _catalogService: CatalogService,
        private _orderService: OrderService,
        private _catalogSearchService: CatalogSearchService,
    ) {}

    public ngOnInit(): void {
        this.getCatalog();
        this.getOrder();
        this.getSearch();
        this.getFilter();
    }

    public getCatalog(): void {
        this.loading = true;
        this._catalogService.getCatalog.subscribe(
            (catalog: ICatalog[]) => {
                this.quantities = [];
                if (catalog.length > 0) {
                    catalog.forEach((product) => this.resetQuantity());
                    this.dataSource = new MatTableDataSource<ICatalog>(catalog);
                    this.loading = false;
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                }
            },
            (error: any) => {
                console.error(error);
                this.loading = false;
            }
        );
    }

    public getOrder(): void {
        this._orderService.getOrder.subscribe((order) => {
            this.order = order;
        });
    }

    public getSearch(): void {
        this._catalogSearchService.getSearch.subscribe((data: string) => {
            console.log('Busqueda', data);
            if (data !== '') {
                this.applySearch(data);
            }
        });
    }

    public getFilter(): void {
        this._catalogSearchService.getFilter.subscribe((data: string) => {
            console.log('Filtro', data);
            if (data !== '') {
                this.applyFilter(data);
            }
        });
    }

    public applySearch(data: string): void {
        if (this.dataSource) {
            this.dataSource.filter = data;
            if (this.dataSource.paginator) {
                this.dataSource.paginator.firstPage();
            }
        }
    }

    public applyFilter(data: string) {
        this.loading = true;
        if (data !== 'N') {
            this._catalogService.getCatalog.subscribe(
                (current_catalog: ICatalog[]) => {
                    this.quantities = [];
                    const filteredCatalog = current_catalog.filter(
                        (product: ICatalog) => {
                            if (product.category === data) {
                                this.resetQuantity();
                                return true;
                            } else {
                                return false;
                            }
                        }
                    );
                    this.dataSource = new MatTableDataSource<ICatalog>(
                        filteredCatalog
                    );
                    this.loading = false;
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                }
            );
        } else {
            this.getCatalog();
        }
    }

    public addProduct(quantity: number, element: IOrder): void {
        const productFound = this.order.find(
            (product) => product.sku === element.sku
        );

        if (productFound) {
            productFound.quantity += quantity;
        } else {
            element.quantity = quantity;
            this.order.push(element);
        }
        this._orderService.setOrder(this.order);
        this._orderService.calcTotal();
    }

    public resetQuantity(): void {
        this.quantities.push();
    }
}
