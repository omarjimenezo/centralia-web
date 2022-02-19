import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ICatalog } from '../../models/catalog.model';
import { CatalogService } from '../../services/catalog.service';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit, AfterViewInit {
    public dataSource: MatTableDataSource<ICatalog>;
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
        private _route: ActivatedRoute,
        private _catalogService: CatalogService
    ) {}

    public ngOnInit(): void {
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

    public ngAfterViewInit() {
        this.setProviderId();
        this.getCatalog();
    }

    public setProviderId(): void {
        const urlParam: string = this._route.snapshot.paramMap.get('id')!;
        console.log('param', urlParam);
        this._catalogService.setProviderId(urlParam);
    }

    public getCatalog(): void {
        this.loading = true;
        this._catalogService.getCatalog.subscribe(
            (catalog: ICatalog[]) => {
                if (catalog.length > 0) {
                    this.dataSource = new MatTableDataSource<ICatalog>(catalog);
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
        if (data !== 'N') {
            this._catalogService.getCatalog.subscribe(
                (current_catalog: ICatalog[]) => {
                    const filteredCatalog = current_catalog.filter(
                        (catalog) => catalog.category === data
                    );
                    this.dataSource = new MatTableDataSource<ICatalog>(
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
