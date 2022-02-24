import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OrderDialogComponent } from '../../components/catalog/order-dialog/order-dialog.component';
import { ICategory, IOrder } from '../../models/catalog.model';
import { CatalogSearchService } from '../../services/catalog-search.service';
import { CatalogService } from '../../services/catalog.service';
import { NavBarService } from '../../services/nav-bar.service';
import { OrderService } from '../../services/order.service';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
    @Output() menuOpen = new EventEmitter();

    public productsAdded: number;
    public loading: boolean;
    public catalogToolbar: boolean;
    public categories: ICategory[];
    public providerId: string;
    public orderTotal: number;

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
            if(val instanceof NavigationEnd) {
                this.catalogToolbar = (this._router.url.includes('catalogo'));
            }
        });
    }

    public ngOnInit(): void {
        this.setProviderId();
        this.getCategories();
        this.getTotal();
    }

    public setProviderId(): void {
        this.providerId = this._route.snapshot.paramMap.get('id')!;
        this._navBarService.setProviderId(this.providerId)
    }

    public getCategories(): void {
        this.loading = true;
        this._catalogService.initCategory(this.providerId);
        this._catalogService.getCategory.subscribe(
            (category: ICategory[]) => {
                if (category.length > 0) {
                    this.categories = category;
                    console.log('categorias', this.categories);
                    this.loading = false;
                }
            },
            (error: any) => {
                console.error(error);
                this.loading = false;
            }
        );

        this._orderService.getOrder.subscribe((order) => {
            this.productsAdded = 0;
            order.forEach((product) => {
                this.productsAdded += product.quantity
            })
        })

    }

    public getTotal(): void{
        this._orderService.getTotal.subscribe((total) => this.orderTotal = total);
    }

    public onSearch(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this._catalogSearchService.setSearch(filterValue.trim().toLowerCase());
    }

    public onCategorySelect(event: string) {
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
}
