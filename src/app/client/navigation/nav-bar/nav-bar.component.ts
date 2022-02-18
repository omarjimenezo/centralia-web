import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from '../../models/catalog.model';
import { CatalogService } from '../../services/catalog.service';
import { MatDialog } from '@angular/material/dialog';
import { ShoppingCartComponent } from '../../components/shopping-cart/shopping-cart.component';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
    @Output() menuOpen = new EventEmitter();

    public productsAdded: number;
    public loading: boolean;
    public categories: Category[];

    constructor(
        private _catalogService: CatalogService,
        public dialog: MatDialog
    ) {}

    public ngOnInit(): void {
        this.getCategories();
        this.productsAdded = 5;
    }

    public getCategories(): void {
        this.loading = true;
        this._catalogService.getCategory.subscribe(
            (category: Category[]) => {
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
