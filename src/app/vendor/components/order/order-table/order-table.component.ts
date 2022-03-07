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
        public _matDialog: MatDialog
    ) {
        const ELEMENT_DATA: IOrder[] = [
            {
                id: 0,
                status: 0,
                total: 0,
                client_name: 'Rosa Melani Pozos',
                client_id: 0,
                client_address: 'string',
                vendor_id: 0,
                date: new Date('2022-03-07T20:44:17.748Z'),
                order_list: [
                    {
                        id: 0,
                        sku: "1276-1",
                        description: "JABON LEON ALOE .350/20",
                        price: "14.61",
                        quantity: 10
                    },
                    {
                        id: 0,
                        sku: "3613",
                        description: "T4N6 S4B1L4",
                        price: "26.55",
                        quantity: 10
                    },
                    {
                        id: 0,
                        sku: "5009",
                        description: "AVENA 3 MIN. BOTE .400/36",
                        price: "22.38",
                        quantity: 10
                    },
                    {
                        id: 0,
                        sku: "1453-1",
                        description: "L3CH3ER4 9O",
                        price: "7.65",
                        quantity: 100
                    },
                    {
                        id: 0,
                        sku: "4030",
                        description: "4CEITE 0LIV4 C4RBON31L .250/12",
                        price: "54.98",
                        quantity: 200
                    },
                    {
                        id: 0,
                        sku: "9493",
                        description: "PASTA BARILLA FETTUCCINE .500/25",
                        price: "498.89",
                        quantity: 50
                    },
                    {
                        id: 0,
                        sku: "0010",
                        description: "105 VELADORAS",
                        price: "0.00",
                        quantity: 1
                    },
                    {
                        id: 0,
                        sku: "9039",
                        description: "CONTENEDOR REYMA 1/2 LTO. 20/25 UD.",
                        price: "44.97",
                        quantity: 50
                    }
                ],
            },
            {
                id: 1,
                client_name: 'Ramon Velarde Zuñiga',
                date: new Date(),
                status: 0,
                total: 15000,
                vendor_id: 1,
                order_list: [
                   
                ],
            },
            {
                id: 2,
                client_name: 'Mini Super Lomas',
                date: new Date(),
                status: 1,
                total: 12000,
                vendor_id: 1,
                order_list: [
                    
                ],
            },
            {
                id: 3,
                client_name: 'El Granero',
                date: new Date(),
                status: 2,
                total: 1500,
                vendor_id: 1,
                order_list: [
                    
                ],
            },
        ];
        this.dataSource = new MatTableDataSource<IOrder>(ELEMENT_DATA);
    }

    public ngOnInit(): void {
        // this.getOrderList();
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    // public getOrder(): void {
    //     this.loading = true;
    //     this._orderService.getOrder.subscribe(
    //         (order: IOrder) => {
    //             this.order = order;
    //             this.dataSource = new MatTableDataSource<IOrder>(order);
    //             this.dataSource.sort = this.sort;
    //             this.dataSource.paginator = this.paginator;
    //         },
    //         (error: any) => {
    //             console.error(error);
    //             this.loading = false;
    //         }
    //     );
    // }

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
