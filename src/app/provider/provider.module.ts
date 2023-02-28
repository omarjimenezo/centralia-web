import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
    MatDialogModule
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SideNavComponent } from '../common/components/navigation/side-nav/side-nav.component';
import { OrderDetailTableComponent } from './components/order/order-detail-table/order-detail-table.component';
import { OrderDetailComponent } from './components/order/order-detail/order-detail.component';
import { OrderTableComponent } from './components/order/order-table/order-table.component';
import { OrderComponent } from './components/order/order.component';
import { ProviderRoutingModule } from './provider-routing.module';
import { ProviderComponent } from './provider.component';

@NgModule({
    declarations: [
        ProviderComponent,
        OrderComponent,
        OrderTableComponent,
        OrderDetailComponent,
        OrderDetailTableComponent,
    ],
    exports: [
        ProviderComponent,
        OrderComponent,
        OrderTableComponent,
        OrderDetailComponent,
        OrderDetailTableComponent,
    ],
    imports: [
        CommonModule,
        ProviderRoutingModule,

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
        MatProgressBarModule,
        MatBottomSheetModule,
        MatListModule,
    ],
    providers: [DatePipe, MatSortModule],
})
export class ProviderModule {}
