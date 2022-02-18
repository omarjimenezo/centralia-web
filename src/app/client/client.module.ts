import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {
    MatSnackBarModule,
    MAT_SNACK_BAR_DEFAULT_OPTIONS
} from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { NavBarComponent } from './navigation/nav-bar/nav-bar.component';
import { SideBarComponent } from './navigation/side-bar/side-bar.component';

@NgModule({
    declarations: [
        ClientComponent,
        DashboardComponent,
        CatalogComponent,
        NavBarComponent,
        SideBarComponent,
        ShoppingCartComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ClientRoutingModule,
        HttpClientModule,

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
    ],
    exports: [
        ClientComponent,
        DashboardComponent,
        CatalogComponent,
        NavBarComponent,
        SideBarComponent,
        ShoppingCartComponent,
    ],
    providers: [
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
            },
        },
    ],
})
export class ClientModule {}
