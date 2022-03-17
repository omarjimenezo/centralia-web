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
import { IOrderList, IOrder } from 'src/app/common/models/order.model';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { AuthService } from 'src/app/common/services/auth.service';
import { IUser } from 'src/app/common/models/user.model';

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
        'status',
        'actions',
        'mobile',
    ];
    public dataSource: MatTableDataSource<IOrder>;

    constructor(
        private datepipe: DatePipe,
        private _cp: ChangeDetectorRef,
        public _orderService: OrderService,
        public _authService: AuthService,
        public _matDialog: MatDialog
    ) {
        this.userInfo = this._authService.getUser();
    }

    public ngOnInit(): void {
        this.getOrders();
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    public getOrders(): void {
        this.loading = true;
        this.dataSource = new MatTableDataSource<IOrder>(
            this._orderService.getOrders(this.userInfo)
        );
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.loading = false;

        // setTimeout(() => {
        //     this.getOrders();
        // }, 3000);
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
}
