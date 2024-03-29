import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LoginComponent } from 'src/app/auth/components/login/login.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CatalogService } from 'src/app/business/services/catalog.service';
import { ICategory } from 'src/app/common/models/product.model';
import { IUser } from 'src/app/common/models/user.model';
import { CatalogSearchService } from 'src/app/common/services/catalog-search.service';
import { DataService } from 'src/app/common/services/data.service';
import { OrderService } from 'src/app/common/services/order.service';

@Component({
    selector: 'centralia-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
    @Output() menuOpen = new EventEmitter();

    public productsAdded: number;
    public loading: boolean = false;
    public totalFadeOut: boolean = false;
    public categories: ICategory[];
    public providerId: string;
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
        private _authService: AuthService,
        private _catalogSearchService: CatalogSearchService,
        private _bottomSheet: MatBottomSheet,
        private _dataService: DataService,
        public dialog: MatDialog,
    ) {
        this._router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.catalogToolbar = this._router.url.includes('productos');
            }
        });
    }

    public ngOnInit(): void {
        this.getUserInfo();
        this.getCategories();
        this.getFilter();
    }

    public getUserInfo(): void {
        if (this._dataService.getUserInfo()) {
            this.userInfo = this._dataService.getUserInfo();
        } else {
            this._dataService.setGuestUser();
            this.userInfo = this._dataService.getUserInfo();
        }
    }

    public isAuthenticated(): boolean {
        return this._authService.isAuthenticated()
    }

    public openLoginDialog(): void {
        const dialogRef = this.dialog.open(LoginComponent, {
            width: '350px',
            data: { returnURL: false },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
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

    public getFilter(): void {
        this._catalogSearchService.getFilter.subscribe((data) => {
            if (data === 'N') {
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
