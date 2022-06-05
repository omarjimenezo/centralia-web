import { DatePipe } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    ViewChild
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IOrder, IOrderResponse } from 'src/app/common/models/order.model';
import { IUser } from 'src/app/common/models/user.model';
import { DataService } from 'src/app/common/services/data.service';
import { OrderService } from 'src/app/common/services/order.service';
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

    public order: IOrder[] = [];
    public userInfo: IUser;

    public displayedColumns: string[] = [
        'client_name',
        'date',
        'provider',
        'status',
        'actions',
        'mobile',
    ];

    public dataSource: MatTableDataSource<IOrder>;

    constructor(
        private datepipe: DatePipe,
        private _cp: ChangeDetectorRef,
        public _orderService: OrderService,
        public _dataService: DataService,
        public _matDialog: MatDialog
    ) {
        this.userInfo = this._dataService.getUserInfo();
    }

    public ngOnInit(): void {
        this.getOrders();
    }

    public getOrders(): void {
        this.loading = true;
        this._orderService.getOrders().subscribe((orders: IOrderResponse) => {
            this._orderService.setOrders(orders.data);
            this.dataSource = new MatTableDataSource<IOrder>(orders.data);
            if (this.dataSource) {
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            }
            this.loading = false;
        });

        setTimeout(() => {
            this.getOrders();
        }, 60000);
    }

    public openOrderDetail(element: IOrder): void {
        const dialogRef = this._matDialog.open(OrderDetailComponent, {
            width: '100%',
            data: element,
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog closed: ${result}`);
        });
    }

    public showProviderColumn(): boolean {
        return (this._dataService.getUserRole() === 1)
    }
    
    public showProviderName(provider_id: string): boolean {
        return (this._dataService.getUserInfo().id !== provider_id)
    }
}
