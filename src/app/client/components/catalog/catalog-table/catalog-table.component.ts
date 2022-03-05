import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CatalogSearchService } from 'src/app/client/services/catalog-search.service';
import { OrderService } from 'src/app/common/services/order.service';
import { IOrder } from 'src/app/common/models/order.model';
import { AlertService } from 'src/app/common/services/alert.service';
import { ICatalog } from '../../../../common/models/catalog.model';
import { CatalogService } from '../../../services/catalog.service';

@Component({
    selector: 'catalog-table',
    templateUrl: './catalog-table.component.html',
    styleUrls: ['./catalog-table.component.scss'],
})
export class CatalogTableComponent implements AfterViewInit, OnDestroy, OnInit {
    public order: IOrder[] = [];
    public quantities: number[] = [];
    public catalog: ICatalog[] = [];
    public tableFadeOut: boolean = false;

    private sub_order: Subscription;
    private sub_catalog: Subscription;
    private sub_catalogSearch: Subscription;
    private sub_catalogFilter: Subscription;

    public displayedColumns = ['product'];

    @Input() loading: boolean;
    @Input() dataSource: MatTableDataSource<ICatalog>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _catalogService: CatalogService,
        private _orderService: OrderService,
        private _catalogSearchService: CatalogSearchService,
        private _alertService: AlertService,
        private _cp: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.getSearch();
        this.getFilter();
        this.getOrder();
    }

    public ngAfterViewInit(): void {
        this.getCatalog();
        this._cp.detectChanges();
    }

    ngOnDestroy() {
        this.sub_order ? this.sub_order.unsubscribe() : null;
        this.sub_catalog ? this.sub_catalog.unsubscribe() : null;
        this.sub_catalogSearch ? this.sub_catalogSearch.unsubscribe() : null;
        this.sub_catalogFilter ? this.sub_catalogFilter.unsubscribe() : null;
    }

    public getCatalog(): void {
        this.loading = true;
        this.sub_order = this._catalogService.getCatalog.subscribe(
            (catalog: ICatalog[]) => {
                this.quantities = [];
                if (catalog.length > 0) {
                    this.catalog = catalog;
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
        this.sub_order = this._orderService.getOrder.subscribe((order) => {
            this.order = order;
        });
    }

    public getSearch(): void {
        this.sub_catalogSearch = this._catalogSearchService.getSearch.subscribe(
            (data: string) => {
                if (data === '' || data.length > 2) {
                    window.scroll(0, 0);
                    this.elementFadeout();
                    this.applySearch(data);
                }
            }
        );
    }

    public getFilter(): void {
        this.sub_catalogFilter = this._catalogSearchService.getFilter.subscribe(
            (data: string) => {
                if (data !== '') {
                    window.scroll(0, 0);
                    this.elementFadeout();
                    this.applyFilter(data);
                }
            }
        );
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
            this.sub_catalog = this._catalogService.getCatalog.subscribe(
                (catalog: ICatalog[]) => {
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
                }
            );
        } else {
            this.getCatalog();
        }
    }

    public addProduct(quantity: number, element: ICatalog): void {
        this._orderService.addProduct(quantity, element);
    }

    public removeProduct(sku: string) {
        this.catalog.map((product) => {
            if (product.sku === sku) {
                product.selected = false;
                product.quantity = 0;
            }
        });
        this._orderService.removeProduct(sku);
        this._catalogService.setCatalog(this.catalog);
    }

    public resetQuantity(): void {
        this.quantities = [];
        this.dataSource.data.forEach((row: ICatalog) =>
            this.quantities.push(0)
        );
        this.order.forEach((product: IOrder) => {
            if (product.quantity > 0) {
                const rowIndex: number = this.dataSource.filteredData.findIndex(
                    (row: ICatalog) => product.sku === row.sku
                );
                if (rowIndex !== -1) {
                    this.quantities[rowIndex] = product.quantity;
                }
            }
        });
    }

    public elementFadeout(): void {
        this.tableFadeOut = true;
        setTimeout(() => {
            this.tableFadeOut = false;
        }, 300);
    }
}
