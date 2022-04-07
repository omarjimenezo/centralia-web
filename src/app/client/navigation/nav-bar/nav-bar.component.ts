import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IOrder } from 'src/app/common/models/order.model';
import { ICategory } from '../../../common/models/catalog.model';
import { OrderService } from '../../../common/services/order.service';
import { OrderDialogComponent } from '../../components/catalog/order-dialog/order-dialog.component';
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
    public providerId: string;
    public orderTotal: number;
    public catalogToolbar: boolean = false;
    public searchKey: string = '';

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _catalogService: CatalogService,
        private _orderService: OrderService,
        private _navBarService: NavBarService,
        private _catalogSearchService: CatalogSearchService,
        public dialog: MatDialog
    ) {
        this._router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.catalogToolbar = this._router.url.includes('catalogo');
            }
        });
    }

    public ngOnInit(): void {
        this.getUrlParams();
        this.getCategories();
        this.getOrder();
        this.getTotal();
    }

    public getUrlParams(): void {
        this._route.queryParams.subscribe((urlParams: any) => {
            if(urlParams.vendorId) {
                this._navBarService.setProviderId(urlParams.vendorId);
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
        this._orderService.getOrder.subscribe((order: IOrder) => {
            this.productsAdded = 0;
            order.description.forEach((product) => {
                this.productsAdded += product.quantity;
            });
        });
    }

    public getTotal(): void {
        this._orderService.getTotal.subscribe((total) => {
            this.elementFadeout();
            this.orderTotal = total;
        });
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
        const dialogRef = this.dialog.open(OrderDialogComponent, {
            width: '99%',
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog closed: ${result}`);
        });
    }

    public elementFadeout(): void {
        this.totalFadeOut = true;
        setTimeout(() => {
            this.totalFadeOut = false;
        }, 300);
    }
}
