import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import {
    MatSnackBarModule,
    MAT_SNACK_BAR_DEFAULT_OPTIONS
} from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ClientRoutingModule } from './business-routing.module';
import { BusinessComponent } from './business.component';
import { CatalogListComponent } from './components/catalog/catalog-list/catalog-list.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CartDialogComponent } from './components/catalog/cart-dialog/cart-dialog.component';
import { AddDialogComponent } from './components/catalog/add-dialog/add-dialog.component';
import { CartTableComponent } from './components/catalog/cart-table/cart-table.component';
import { ProvidersComponent } from './components/providers/providers.component';
import { NavBarComponent } from './navigation/nav-bar/nav-bar.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailComponent } from './components/order/order-detail/order-detail.component';
import { OrderDetailTableComponent } from './components/order/order-detail-table/order-detail-table.component';
import { OrderTableComponent } from './components/order/order-table/order-table.component';
import { UserActionsDialogComponent } from './navigation/user-actions-dialog/user-actions-dialog.component';
import { SideNavComponent } from './navigation/side-nav/side-nav.component';

@NgModule({
    declarations: [
        BusinessComponent,
        ProvidersComponent,
        CatalogComponent,
        CatalogListComponent,
        NavBarComponent,
        CartTableComponent,
        CartDialogComponent,
        AddDialogComponent,
        UserActionsDialogComponent,
        OrderComponent,
        OrderDetailComponent,
        OrderDetailTableComponent,
        OrderTableComponent,
        SideNavComponent,
    ],
    exports: [
        BusinessComponent,
        ProvidersComponent,
        CatalogComponent,
        CatalogListComponent,
        NavBarComponent,
        CartTableComponent,
        CartDialogComponent,
        AddDialogComponent,
        UserActionsDialogComponent,
        OrderComponent,
        OrderDetailComponent,
        OrderDetailTableComponent,
        OrderTableComponent,
        SideNavComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ClientRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,

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
        MatListModule,
        MatGridListModule,
        MatProgressBarModule,
        MatBottomSheetModule,
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
            },
        },
    ],
})
export class BusinessModule {}
