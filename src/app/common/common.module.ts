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
import { AddDialogComponent } from './components/catalog/add-dialog/add-dialog.component';
import { CartDialogComponent } from './components/catalog/cart-dialog/cart-dialog.component';
import { CartTableComponent } from './components/catalog/cart-table/cart-table.component';
import { CatalogListComponent } from './components/catalog/catalog-list/catalog-list.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProvidersComponent } from './components/providers/providers.component';

@NgModule({
    declarations: [
        AlertComponent,
        ProvidersComponent,
        CatalogComponent,
        AddDialogComponent,
        CartDialogComponent,
        CartTableComponent,
        CatalogListComponent,
    ],
    exports: [
        AlertComponent,
        ProvidersComponent,
        CatalogComponent,
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
