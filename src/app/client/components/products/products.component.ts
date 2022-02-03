import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product, ProductLine } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

export interface PeriodicElement {
    imageUrl: string;
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: Product[] = [
    {
        line_code: 10,
        product_code: '1276-1',
        name: 'JABON LEON ALOE .350/20',
        price: 14.61,
        image: '',
    },
    {
        line_code: 10,
        product_code: '1276-2',
        name: 'JABON LEON ALTO PODER .350/20',
        price: 14.61,
        image: '',
    },
    {
        line_code: 10,
        product_code: '1276-3',
        name: 'JABON LEON BEBE .350/20',
        price: 14.61,
        image: '',
    },
    {
        line_code: 10,
        product_code: '1276-4',
        name: 'JABON LEON SUAVIZANTE .350/20',
        price: 14.61,
        image: '',
    },
    {
        line_code: 10,
        product_code: '1276-1',
        name: 'JABON LEON ALOE .350/20',
        price: 14.61,
        image: '',
    },
    {
        line_code: 10,
        product_code: '1276-2',
        name: 'JABON LEON ALTO PODER .350/20',
        price: 14.61,
        image: '',
    },
    {
        line_code: 10,
        product_code: '1276-3',
        name: 'JABON LEON BEBE .350/20',
        price: 14.61,
        image: '',
    },
    {
        line_code: 10,
        product_code: '1276-4',
        name: 'JABON LEON SUAVIZANTE .350/20',
        price: 14.61,
        image: '',
    },
];

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
    public productsResult: ProductLine[] = [];
    public dataSource: MatTableDataSource<Product>;
    public displayedColumns = ['name', 'price', 'actions'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _router: Router,
        private _productService: ProductService
    ) {
        
    }

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
        this._productService
            .getProductLine()
            .subscribe((result: ProductLine[]) => {
                this.dataSource = new MatTableDataSource<Product>(
                    result[0].product
                );
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                // this.productsResult.forEach((line) => {
                //     this.productList.push(...line.product);
                // });
            });
    }
}
