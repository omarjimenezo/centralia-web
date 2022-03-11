import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
    MatDialogModule
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { OrderDetailTableComponent } from './components/order/order-detail-table/order-detail-table.component';
import { OrderDetailComponent } from './components/order/order-detail/order-detail.component';
import { OrderTableComponent } from './components/order/order-table/order-table.component';
import { OrderComponent } from './components/order/order.component';
import { NavBarComponent } from './navigation/nav-bar/nav-bar.component';
import { VendorRoutingModule } from './vendor-routing.module';
import { VendorComponent } from './vendor.component';

@NgModule({
    declarations: [
        VendorComponent,
        NavBarComponent,
        OrderComponent,
        OrderTableComponent,
        OrderDetailComponent,
        OrderDetailTableComponent,
    ],
    exports: [
        VendorComponent,
        NavBarComponent,
        OrderComponent,
        OrderTableComponent,
        OrderDetailComponent,
        OrderDetailTableComponent,
    ],
    imports: [
        CommonModule,
        VendorRoutingModule,

        // Angular Material
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatDividerModule,
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSortModule,
        MatBadgeModule,
        MatSelectModule,
        MatDialogModule,
        MatGridListModule,
    ],
    providers: [DatePipe, MatSortModule],
})
export class VendorModule {}
