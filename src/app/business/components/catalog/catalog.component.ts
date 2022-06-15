import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { IDependencyResponse } from 'src/app/auth/models/auth.model';
import { GlobalConstants } from 'src/app/common/models/global.constants';
import { IOrder } from 'src/app/common/models/order.model';
import { IUser } from 'src/app/common/models/user.model';
import { AlertService } from 'src/app/common/services/alert.service';
import { DataService } from 'src/app/common/services/data.service';
import { ICatalog } from '../../../common/models/catalog.model';
import { OrderService } from '../../../common/services/order.service';
import { CatalogSearchService } from '../../services/catalog-search.service';
import { CatalogService } from '../../services/catalog.service';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit, OnDestroy {
    public catalog: ICatalog[] = [];
    public displayCatalog: ICatalog[] = [];
    public order: IOrder;
    public dataSource: MatTableDataSource<ICatalog>;
    public loading: boolean = false;
    public buttonFadeOut: boolean = false;
    public productFade: boolean = false;
    public cols: number = 2;
    public orderTotal: number = 0;
    public productsAdded: number = 0;
    public client_address: string = '';
    public client_name: string = '';
    public providerId: number;
    public userInfo: IUser;


    private sub_catalog: Subscription;
    private sub_order: Subscription;
    private sub_total: Subscription;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _dataService: DataService,
        private _orderService: OrderService,
        private _global: GlobalConstants,
        private _catalogService: CatalogService,
        private _catalogSearchService: CatalogSearchService,
        private _cookieService: CookieService,
        public _alertService: AlertService,
        public _matDialog: MatDialog
    ) { }

    public ngOnInit(): void {
        this.getCatalog();
        this.getOrder();
        this.getTotal();
        this.getProviderId();
        this.getFilter();
        this.getSearch();
        this.resetQuantities();
    }

    public ngOnDestroy(): void {
        this.sub_order ? this.sub_order.unsubscribe() : null;
        this.sub_total ? this.sub_total.unsubscribe() : null;
    }

    public getCatalog(): void {
        this.catalog = [];
        this.displayCatalog = [];
        this.loading = true;
        this.sub_catalog = this._catalogService.getCatalog.subscribe(
            (catalog: ICatalog[]) => {
                if (catalog.length > 0) {
                    this.catalog = catalog;
                    this.displayCatalog = catalog;
                }
                this.loading = false;
            },
            (error: any) => {
                console.error(error);
                this.loading = false;
            }
        );
    }

    public getProviderId(): void {
        let userInfo: IUser = JSON.parse(this._cookieService.get('userInfo'))
        let providerId: string = this._activatedRoute.snapshot.paramMap.get('id')!
        this._dataService.setProviderId(providerId);

        this._dataService.getDependencyBySubId(userInfo.id).subscribe(
            (dependency: IDependencyResponse) => {
                (dependency && dependency.data && dependency.data.length > 0) ? this._dataService.setVendorId(dependency.data[0].sup_user_id) : this._dataService.setVendorId(providerId)

            },
            (error) => {
                this._alertService.openAlert(
                    this._global.ERROR_MESSAGES.CONNECTION_ERROR,
                    1
                );
                console.error(error);

            }
        );
    }

    public getOrder(): void {
        this.sub_order = this._orderService.getOrder.subscribe(
            (order: IOrder) => {
                this.elementFadeout();
                this.order = order;
                this.productsAdded = 0;
                order.description.forEach((product) => {
                    this.productsAdded += product.quantity;
                });

            },
            (error: any) => {
                console.error(error);

            }
        );
    }

    public getClient(): void {
        this.userInfo = this._dataService.getUserInfo();
    }

    public getSearch(): void {
        this._catalogSearchService.getSearch.subscribe((data: string) => {
            if (data.length > 2) {
                this._catalogSearchService.setFilter('N')
                window.scroll(0, 0);
                this.elementFadeout();
                this.displayCatalog = this.catalog.filter((product: ICatalog) =>
                    product.description.toLowerCase().includes(data)
                );
            }

            if (data.length === 0) {
                window.scroll(0, 0);
                this.elementFadeout();
                this.displayCatalog = this.catalog;
            }
        });
    }

    public getFilter(): void {
        this._catalogSearchService.getFilter.subscribe((data: string) => {
            if (data !== '') {
                window.scroll(0, 0);
                this.elementFadeout();
                if (data !== 'N') {
                    this.displayCatalog = this.catalog.filter(
                        (product: ICatalog) => product.category === data
                    );
                } else {
                    this.displayCatalog = this.catalog;
                }
            }
        });
    }

    public resetQuantities(): void {
        this._catalogService.getResetQuantities.subscribe(() => {
            this.elementFadeout();
            this.displayCatalog.map((product) => {
                product.quantity = 0;
                product.selected = false
            });
        })
    }

    public getTotal(): void {
        this.sub_total = this._orderService.getTotal.subscribe(
            (total) => (this.orderTotal = total)
        );
    }

    public openOrderDialog(): void {
        const dialogRef = this._matDialog.open(CartDialogComponent, {
            data: { dialogMode: true },
            width: '99%',
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog closed: ${result}`);
        });
    }

    public elementFadeout(): void {
        this.productFade = true;
        setTimeout(() => {
            this.productFade = false;
        }, 500);
    }
}
