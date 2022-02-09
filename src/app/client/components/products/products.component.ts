import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product, ProductLine } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
    public productsResult: ProductLine[] = [];
    public dataSource: MatTableDataSource<Product>;
    public displayedColumns = ['sku', 'description', 'price', 'actions'];
    public loading = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _router: Router,
        private _productService: ProductService
    ) {}

    public ngOnInit(): void {
        this.getProducts();
    }

    public applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public getProducts(): void {
        this.loading = true;
        this._productService.getProductLine().subscribe(
            (result: Product[]) => {
                console.log('çatalog', result);
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
