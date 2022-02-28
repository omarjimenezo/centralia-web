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
    public tableFadeOut: boolean = false;

    public displayedColumns = ['desktop'];

    @Input() loading: boolean;
    @Input() dataSource: MatTableDataSource<ICatalog>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _catalogService: CatalogService,
        private _orderService: OrderService,
        private _catalogSearchService: CatalogSearchService
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
                    this.dataSource = new MatTableDataSource<ICatalog>(catalog);
                    this.resetQuantity();
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
            if (data === '' || data.length > 2) {
                window.scroll(0, 0);
                this.elementFadeout();
                this.applySearch(data);
            }
        });
    }

    public getFilter(): void {
        this._catalogSearchService.getFilter.subscribe((data: string) => {
            console.log('Filtro', data);
            if (data !== '') {
                window.scroll(0, 0);
                this.elementFadeout();
                this.applyFilter(data);
            }
        });
    }

    public applySearch(data: string): void {
        if (this.dataSource) {
            this.dataSource.filter = data;
            this.resetQuantity();
            if (this.dataSource.paginator) {
                this.dataSource.paginator.firstPage();
            }
        }
    }

    public applyFilter(data: string) {
        if (data !== 'N') {
            this._catalogService.getCatalog.subscribe((catalog: ICatalog[]) => {
                const filteredCatalog = catalog.filter(
                    (product: ICatalog) => product.category === data
                );
                this.dataSource = new MatTableDataSource<ICatalog>(
                    filteredCatalog
                );
                this.resetQuantity();
                this.loading = false;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
        } else {
            this.getCatalog();
        }
    }

    public addProduct(quantity: number, element: ICatalog): void {
        const productFound = this.order.find(
            (product) => product.sku === element.sku
        );

        if (productFound) {
            productFound.quantity = quantity;
        } else {
            element.selected = true;

            this.order.push({
                sku: element.sku,
                description: element.description,
                price: element.price,
                quantity: quantity,
            });
        }
        this._orderService.setOrder(this.order);
        this._orderService.calcTotal();
    }

    public resetQuantity(): void {
        this.quantities = [];
        this.dataSource.data.forEach((row: ICatalog) =>
            this.quantities.push(1)
        );
        this.order.forEach((product: IOrder) => {
            if (product.quantity > 1) {
                const rowIndex: number = this.dataSource.filteredData.findIndex(
                    (row: ICatalog) => product.sku === row.sku
                );
                if(rowIndex !== -1) {
                    this.quantities[rowIndex] = product.quantity;
                }
            }
        });
    }

    public elementFadeout(): void {
        this.tableFadeOut = true;
        setTimeout(() => {
            this.tableFadeOut = false;
        }, 300)
    }
}
