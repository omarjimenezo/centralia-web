import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CatalogSearchService } from '../../services/catalog-search.service';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
    @Output() menuOpen = new EventEmitter();

    public productsAdded: number;
    public isMobile: boolean;

    constructor(private _catalogSearchService: CatalogSearchService) {}

    public ngOnInit(): void {
        if (window.screen.width <= 700) { // 768px portrait
            this.isMobile = true;
          }
        this.productsAdded = 5;
    }

    public onSearch(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this._catalogSearchService.setSearch(filterValue.trim().toLowerCase());
    }
}
