import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IOrder } from '../../models/order.model';
import { IBusinessProducts, IProduct } from '../../models/product.model';
import { IUser } from '../../models/user.model';
import { OrdersDialogComponent } from './orders-dialog/orders-dialog.component';
import { AlertService } from '../../services/alert.service';
import { CatalogSearchService } from '../../services/catalog-search.service';
import { DataService } from '../../services/data.service';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    public displayProducts: IBusinessProducts[] = [];
    public order: IOrder;
    public dataSource: MatTableDataSource<IProduct>;
    public loading: boolean = false;
    public buttonFadeOut: boolean = false;
    public productFade: boolean = false;
    public orderTotal: number = 0;
    public productsAdded: number = 0;
    public providerId: string;
    public userInfo: IUser;

    public products: IBusinessProducts[] = [
        {
            producto: {
                id: "01",
                descripcion: "Coca-Cola 2L Retornable",
                categoria: { id: "1", nombre: "Refrescos" },
                codigo: "55223",
                sku: undefined,
            },
            img: "https://cdn.shopify.com/s/files/1/0372/4450/2149/products/bebidas_25l-retornable1-2944af12f7044a308015856940174122-1024-1024_701x700.jpg",
            precio: 25.50,
            cantidad: undefined
        },
        {
            producto: {
                id: "02",
                descripcion: "Coca-Cola 2L No-Retornable",
                categoria: { id: "1", nombre: "Refrescos" },
                codigo: "55223",
                sku: undefined,
            },
            img: "https://cdn.shopify.com/s/files/1/0372/4450/2149/products/7501055302925-00-CH1200Wx1200H_1_700x700.jpg?v=1588184406",
            precio: 25.50,
            cantidad: undefined
        },
        {
            producto: {
                id: "03",
                descripcion: "Coca-Cola 1.5L Retornable",
                categoria: { id: "1", nombre: "Refrescos" },
                codigo: "55223",
                sku: undefined,
            },
            img: "https://cdnx.jumpseller.com/bepensa-bebidas/image/8166346/CC_1.5L_RP.png?1645836463",
            precio: 15.50,
            cantidad: undefined
        },
        {
            producto: {
                id: "04",
                descripcion: "Coca-Cola 1.5L No-Retornable",
                categoria: { id: "1", nombre: "Refrescos" },
                codigo: "55223",
                sku: undefined,
            },
            img: "https://res.cloudinary.com/walmart-labs/image/upload/d_default.jpg/w_960,dpr_auto,f_auto,q_auto:best/gr/images/product-images/img_large/00750105530354L.jpg",
            precio: 15.50,
            cantidad: undefined
        }
    ];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _dataService: DataService,
        private _orderService: OrderService,
        private _productService: ProductService,
        private _catalogSearchService: CatalogSearchService,
        private _cookieService: CookieService,
        public _alertService: AlertService,
        public _matDialog: MatDialog
    ) {
        this.userInfo = JSON.parse(this._cookieService.get('userInfo'))
        this.providerId = this._activatedRoute.snapshot.paramMap.get('id')!

        if (this.providerId) {
            this._dataService.setProviderId(this.providerId);
        }
    }

    public ngOnInit(): void {
        this.getFilter();
        this.getSearch();
    }

    public getProducts(): void {

    }

    public getSearch(): void {
        this._catalogSearchService.getSearch.subscribe((data: string) => {
            if (data.length > 2) {
                this._catalogSearchService.setFilter('N')
                window.scroll(0, 0);
                this.elementFadeout();
                this.displayProducts = this.products.filter((product: IBusinessProducts) =>
                    product.producto.descripcion.toLowerCase().includes(data)
                );
            }

            if (data.length === 0) {
                window.scroll(0, 0);
                this.elementFadeout();
                this.displayProducts = this.products;
            }
        });
    }

    public getFilter(): void {
        this._catalogSearchService.getFilter.subscribe((data: string) => {
            if (data !== '') {
                window.scroll(0, 0);
                this.elementFadeout();
                if (data !== 'N') {
                    this.displayProducts = this.products.filter(
                        (product: IBusinessProducts) => product.producto.categoria.nombre === data
                    );
                } else {
                    this.displayProducts = this.products;
                }
            }
        });
    }

    public openOrdersDialog(): void {
        const dialogRef = this._matDialog.open(OrdersDialogComponent, {
            data: { dialogMode: true },
            width: '99%',
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog closed: ${result}`);
        });
    }

    public elementFadeout(): void {
        this.productFade = true;
        setTimeout(() => {
            this.productFade = false;
        }, 500);
    }
}
