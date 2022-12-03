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
import { AddDialogComponent } from './components/products/add-dialog/add-dialog.component';
import { CartDialogComponent } from './components/products/cart-dialog/cart-dialog.component';
import { CartTableComponent } from './components/products/cart-table/cart-table.component';
import { CatalogListComponent } from './components/products/catalog-list/catalog-list.component';
import { ProductsComponent } from './components/products/products.component';
import { ProvidersComponent } from './components/providers/providers.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';

@NgModule({
    declarations: [
        AlertComponent,
        ProvidersComponent,
        ProductsComponent,
        AddDialogComponent,
        CartDialogComponent,
        CartTableComponent,
        CatalogListComponent,
        ProductsComponent,
        ProductsListComponent,
    ],
    exports: [
        AlertComponent,
        ProvidersComponent,
        ProductsComponent,
        ProductsListComponent,
        AddDialogComponent,
        CartDialogComponent,
        CartTableComponent,
        CatalogListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ReactiveFormsModule,

        // Angular Material
        MatSnackBarModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
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
        CookieService
    ],
})
export class CommonComponentsModule {}
