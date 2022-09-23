import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IOrder } from 'src/app/common/models/order.model';
import { IUser } from 'src/app/common/models/user.model';
import { DataService } from 'src/app/common/services/data.service';
import { ICategory } from '../../../common/models/catalog.model';
import { OrderService } from '../../../common/services/order.service';
import { CartDialogComponent } from '../../components/catalog/cart-dialog/cart-dialog.component';
import { CatalogSearchService } from '../../services/catalog-search.service';
import { CatalogService } from '../../services/catalog.service';
import { NavBarService } from '../../services/nav-bar.service';
import { UserActionsDialogComponent } from '../user-actions-dialog/user-actions-dialog.component';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
    @Output() menuOpen = new EventEmitter();

    public productsAdded: number;
    public loading: boolean = false;
    public totalFadeOut: boolean = false;
    public categories: ICategory[];
    public providerId: number;
    public orderTotal: number;
    public catalogToolbar: boolean = false;
    public searchKey: string = '';
    public filterKey: string = '';
    public userInfo: IUser;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _catalogService: CatalogService,
        private _orderService: OrderService,
        private _navBarService: NavBarService,
        private _catalogSearchService: CatalogSearchService,
        private _bottomSheet: MatBottomSheet,
        private _dataService: DataService,
        public dialog: MatDialog
    ) {
        this._router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.catalogToolbar = this._router.url.includes('catalogo');
            }
        });
    }

    public ngOnInit(): void {
        this.getUserInfo();
        this.getUrlParams();
        this.getCategories();
        this.getOrder();
        this.getTotal();
        this.getFilter();
    }

    public getUserInfo(): void {
        this.userInfo = this._dataService.getUserInfo();
    }

    public getUrlParams(): void {
        this._route.queryParams.subscribe((urlParams: any) => {
            if (urlParams.providerId) {
                this._dataService.setProviderId(urlParams.providerId);
            }
        });
    }

    public getCategories(): void {
        this.loading = true;
        this._catalogService.initCategories(this.providerId);
        this._catalogService.getCategory.subscribe(
            (category: ICategory[]) => {
                if (category.length > 0) {
                    this.categories = category;
                }
                this.loading = false;
            },
            (error: any) => {
                console.error(error);
                this.loading = false;
            }
        );
    }

    public getOrder(): void {
        this._orderService.getOrder.subscribe(
            (order: IOrder) => {
                this.productsAdded = 0;
                order.description.forEach((product) => {
                    this.productsAdded += product.quantity;
                });
            }
        );
    }

    public getTotal(): void {
        this._orderService.getTotal.subscribe((total) => {
            this.elementFadeout();
            this.orderTotal = total;
        });
    }

    public getFilter(): void {
        this._catalogSearchService.getFilter.subscribe((data) => {
            if(data === 'N') {
                this.filterKey = data;
            }
        })
    }

    public toogleSideNav(): void {
        this.menuOpen.emit('ok');
    }

    public onSearch(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this._catalogSearchService.setSearch(filterValue.trim().toLowerCase());
    }

    public onCategorySelect(event: string) {
        this._catalogSearchService.setSearch('');
        this.searchKey = '';
        this._catalogSearchService.setFilter(event);
    }

    public openCartDialog() {
        const dialogRef = this.dialog.open(CartDialogComponent, {
            width: '99%',
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog closed: ${result}`);
        });
    }

    public openUserActionsDialog(): void {
        this._bottomSheet.open(UserActionsDialogComponent);
    }

    public elementFadeout(): void {
        this.totalFadeOut = true;
        setTimeout(() => {
            this.totalFadeOut = false;
        }, 300);
    }
}
