import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from '../../models/product.model';
import { CatalogSearchService } from '../../services/catalog-search.service';
import { ProductService } from '../../services/product.service';

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
        private _catalogSearchService: CatalogSearchService,
        private _productService: ProductService
    ) {}

    public ngOnInit(): void {
        this.getCategories();
        this.productsAdded = 5;
    }

    public getCategories(): void {
        this.loading = true;
        this._productService.getCategory().subscribe(
            (result: Category[]) => {
                this.categories = result;
                console.log(this.categories)
                this.loading = false;
            },
            (error) => {
                this.loading = false;
            }
        );
    }

    public onSearch(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this._catalogSearchService.setSearch(filterValue.trim().toLowerCase());
    }
}
