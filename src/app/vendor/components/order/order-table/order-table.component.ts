import { DatePipe } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/common/services/order.service';
import { IOrderList } from 'src/app/common/models/order.model';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

@Component({
    selector: 'order-table',
    styleUrls: ['order-table.component.scss'],
    templateUrl: 'order-table.component.html',
})
export class OrderTableComponent implements OnInit {
    @Input() loading: boolean;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public orderList: IOrderList[] = [];

    public displayedColumns: string[] = [
        'client_name',
        'date',
        'status',
        'actions',
        'mobile',
    ];
    public dataSource: MatTableDataSource<IOrderList>;

    constructor(
        private datepipe: DatePipe,
        private _cp: ChangeDetectorRef,
        public _orderService: OrderService,
        public _matDialog: MatDialog
    ) {
        const ELEMENT_DATA: IOrderList[] = [
            {
                id: 1,
                client_name: 'Ramon Velarde Zuñiga',
                date: this.datepipe.transform(new Date(), 'dd/MM/yyyy')!,
                status: 0,
                total: 15000,
                vendor_id: 1,
            },
            {
                id: 2,
                client_name: 'Mini Super Lomas',
                date: this.datepipe.transform(new Date(), 'dd/MM/yyyy')!,
                status: 1,
                total: 12000,
                vendor_id: 1,
            },
            {
                id: 3,
                client_name: 'El Granero',
                date: this.datepipe.transform(new Date(), 'dd/MM/yyyy')!,
                status: 2,
                total: 1500,
                vendor_id: 1,
            },
        ];
        this.dataSource = new MatTableDataSource<IOrderList>(ELEMENT_DATA);
    }

    public ngOnInit(): void {
        // this.getOrderList();
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    public getOrderList(): void {
        this.loading = true;
        this._orderService.getOrderList.subscribe(
            (orderList: IOrderList[]) => {
                this.orderList = orderList;
                this.dataSource = new MatTableDataSource<IOrderList>(orderList);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            },
            (error: any) => {
                console.error(error);
                this.loading = false;
            }
        );
    }

    public openOrderDetail(element: IOrderList): void {
        const dialogRef = this._matDialog.open(OrderDetailComponent, {
            width: '100%',
            data: element,
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog closed: ${result}`);
        });
    }
}
