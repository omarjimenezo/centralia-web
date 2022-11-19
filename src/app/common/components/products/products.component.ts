import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { IDependencyResponse } from 'src/app/auth/models/auth.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ICatalog } from '../../models/catalog.model';
import { GlobalConstants } from '../../models/global.constants';
import { IOrder } from '../../models/order.model';
import { IUser } from '../../models/user.model';
import { AlertService } from '../../services/alert.service';
import { CatalogSearchService } from '../../services/catalog-search.service';
import { CatalogService } from '../../services/catalog.service';
import { DataService } from '../../services/data.service';
import { OrderService } from '../../services/order.service';
import { CartDialogComponent } from '../products/cart-dialog/cart-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

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
    public providerId: number = 0;
    public userInfo: IUser;


    private sub_catalog: Subscription;
    private sub_order: Subscription;
    private sub_total: Subscription;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _dataService: DataService,
        private _orderService: OrderService,
        private _global: GlobalConstants,
        private _catalogService: CatalogService,
        private _catalogSearchService: CatalogSearchService,
        private _cookieService: CookieService,
        public _alertService: AlertService,
        public _matDialog: MatDialog
    ) {
        this.userInfo = JSON.parse(this._cookieService.get('userInfo'))
        this.providerId = parseInt(this._activatedRoute.snapshot.paramMap.get('id')!)

        if (this.providerId) {
            this._dataService.setProviderId(this.providerId);
            this._catalogService.initCatalog(this.providerId);
            this._catalogService.initCategories(this.providerId);
        }
    }

    public ngOnInit(): void {
        // this.getDependency();
        this.getCatalog();
        this.getOrder();
        this.getTotal();
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

    public getDependency(): void {
        if (this._authService.isAuthenticated()) {
            this._dataService.getDependencyBySubId(this.userInfo.id).subscribe(
                (dependency: IDependencyResponse) => {
                    (dependency && dependency.data && dependency.data.length > 0) ? this._dataService.setVendorId(dependency.data[0].sup_user_id) : this._dataService.setVendorId(this.providerId)

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
    }

    public getOrder(): void {
        this.sub_order = this._orderService.getOrder.subscribe(
            (order: IOrder) => {
                this.elementFadeout();
                this.order = order;
                this.productsAdded = 0;
                this.productsAdded = order.description.length;

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
                    product.descripcion.toLowerCase().includes(data)
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
                        (product: ICatalog) => product.categoria.nombre === data
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
                product.cantidad = 0;
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
