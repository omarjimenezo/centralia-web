import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
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
    MatSnackBarModule
} from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CookieService } from 'ngx-cookie-service';
import { AlertComponent } from './components/alert/alert.component';
import { NavBarComponent } from './components/navigation/nav-bar/nav-bar.component';
import { SideNavComponent } from './components/navigation/side-nav/side-nav.component';
import { AddDialogComponent } from './components/products/add-dialog/add-dialog.component';
import { OrderListComponent } from './components/products/orders-dialog/order-list/order-list.component';
import { OrdersDialogComponent } from './components/products/orders-dialog/orders-dialog.component';
import { ProvidersListComponent } from './components/products/orders-dialog/providers-list/providers-list.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductsComponent } from './components/products/products.component';
import { ProvidersComponent } from './components/providers/providers.component';

@NgModule({
    declarations: [
        AlertComponent,
        ProvidersComponent,
        ProductsComponent,
        ProductsListComponent,
        AddDialogComponent,
        OrdersDialogComponent,
        ProvidersListComponent,
        OrderListComponent,
        NavBarComponent,
        SideNavComponent
    ],
    exports: [
        AlertComponent,
        ProvidersComponent,
        ProductsComponent,
        ProductsListComponent,
        AddDialogComponent,
        OrdersDialogComponent,
        NavBarComponent,
        SideNavComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ReactiveFormsModule,

        // Angular Material
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
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
        CookieService
    ],
})
export class CommonComponentsModule {}
