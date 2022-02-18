import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Catalog } from '../../models/catalog.model';
import { CatalogService } from '../../services/catalog.service';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
    public dataSource: MatTableDataSource<Catalog>;
    public displayedColumns = [
        'description',
        'price',
        'quantity',
        'add',
        'mobile',
    ];
    public loading = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _router: Router,
        private _catalogService: CatalogService
    ) {}

    public ngOnInit(): void {
        this.getCatalog();

        this._catalogService.getSearch.subscribe((data: string) => {
            console.log('Busqueda', data);
            if (data !== '') {
                this.applySearch(data);
            }
        });

        this._catalogService.getFilter.subscribe((data: string) => {
            console.log('Filtro', data);
            if (data !== '') {
                this.applyFilter(data);
            }
        });
    }

    public getCatalog(): void {
        this.loading = true;
        this._catalogService.getCatalog.subscribe(
            (catalog: Catalog[]) => {
                if (catalog.length > 0) {
                    this.dataSource = new MatTableDataSource<Catalog>(catalog);
                    this.loading = false;
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                }
            },
            (error: any) => {
                console.error(error);
                this.loading = false;
            }
        );
    }

    public applySearch(data: string): void {
        if (this.dataSource) {
            this.dataSource.filter = data;
            if (this.dataSource.paginator) {
                this.dataSource.paginator.firstPage();
            }
        }
    }

    public applyFilter(data: string) {
        this.loading = true;
        if(data !== 'N') {
            this._catalogService.getCatalog.subscribe(
                (current_catalog: Catalog[]) => {
                    const filteredCatalog = current_catalog.filter(
                        (catalog) => catalog.category === data
                    );
                    this.dataSource = new MatTableDataSource<Catalog>(
                        filteredCatalog
                    );
                    this.loading = false;
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                }
            );
        } else {
            this.getCatalog();
        }
    }
}
