import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCartComponent } from '../../components/shopping-cart/shopping-cart.component';
import { ICategory } from '../../models/catalog.model';
import { CatalogService } from '../../services/catalog.service';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
    @Output() menuOpen = new EventEmitter();

    public productsAdded: number;
    public loading: boolean;
    public categories: ICategory[];

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _catalogService: CatalogService,
        public dialog: MatDialog
    ) {}

    public ngOnInit(): void {
        this.setProviderId();
        this.getCategories();
        this.productsAdded = 5;
        console.log('route', this._router.url)
    }

    public setProviderId(): void {
        const urlParam: string = this._route.snapshot.paramMap.get('id')!;
        this._catalogService.setProviderId(
            urlParam
        );
    }

    public getCategories(): void {
        this.loading = true;
        this._catalogService.initCategory();
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
    }

    public onSearch(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this._catalogService.setSearch(filterValue.trim().toLowerCase());
    }

    public onCategorySelect(event: string) {
        this._catalogService.setFilter(event);
    }

    public openCartDialog() {
        const dialogRef = this.dialog.open(ShoppingCartComponent, {
            width: '99%',
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog closed: ${result}`);
        });
    }
}
