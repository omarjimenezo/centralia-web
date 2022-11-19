import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CartDialogComponent } from 'src/app/common/components/products/cart-dialog/cart-dialog.component';
import { IOrder } from 'src/app/common/models/order.model';
import { IUser } from 'src/app/common/models/user.model';
import { DataService } from 'src/app/common/services/data.service';
import { UserActionsDialogComponent } from 'src/app/provider/navigation/user-actions-dialog/user-actions-dialog.component';
import { ICategory } from '../../../common/models/catalog.model';
import { OrderService } from '../../../common/services/order.service';
import { CatalogSearchService } from '../../services/catalog-search.service';
import { CatalogService } from '../../services/catalog.service';
import { NavBarService } from '../../services/nav-bar.service';

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
    public user: IUser;

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
        this.getCategories();
        this.getFilter();
    }

    public getUserInfo(): void {
        this.user = this._dataService.getUserInfo();
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

    public elementFadeout(): void {
        this.totalFadeOut = true;
        setTimeout(() => {
            this.totalFadeOut = false;
        }, 300);
    }
}
