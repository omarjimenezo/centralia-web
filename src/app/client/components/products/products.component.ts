import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { CatalogSearchService } from '../../services/catalog-search.service';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
    public dataSource: MatTableDataSource<Product>;
    public displayedColumns = ['description', 'price', 'quantity', 'add', 'mobile'];
    public loading = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _router: Router,
        private _productService: ProductService,
        private _catalogSearchService: CatalogSearchService
    ) {}

    public ngOnInit(): void {
        this.getProducts();
        this._catalogSearchService.getSearch.subscribe((data: string) => {
            console.log('Busqueda',data);
            this.applyFilter(data);
          });
    }

    public applyFilter(data: string): void {
        // const filterValue = (event.target as HTMLInputElement).value;
        if(this.dataSource) {
            this.dataSource.filter = data;
            if (this.dataSource.paginator) {
                this.dataSource.paginator.firstPage();
            }
        }

    }

    public getProducts(): void {
        this.loading = true;
        this._productService.getCatalog().subscribe(
            (result: Product[]) => {
                this.dataSource = new MatTableDataSource<Product>(result);
                this.loading = false;   
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            (error) => {
                this.loading = false;
            }
        );
    }
}
