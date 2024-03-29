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
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../common/components/navigation/nav-bar/nav-bar.component';
import { SideNavComponent } from '../common/components/navigation/side-nav/side-nav.component';
import { BusinessInfoComponent } from './components/info/business-info/business-info.component';
import { GeneralInfoComponent } from './components/info/general-info/general-info.component';
import { ProvidersInfoComponent } from './components/info/providers-info/providers-info.component';
import { GuestRoutingModule } from './guest-routing.component';
import { GuestComponent } from './guest.component';

@NgModule({
    declarations: [
        GuestComponent,
        ProvidersInfoComponent,
        GeneralInfoComponent,
        BusinessInfoComponent,
    ],
    exports: [
        GuestComponent,
        ProvidersInfoComponent,
        GeneralInfoComponent,
        BusinessInfoComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule,
        GuestRoutingModule,

        

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
export class GuestModule { }
