import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './components/alert/alert.component';
import {
    MatSnackBarModule,
    MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';

@NgModule({
    declarations: [AlertComponent],
    imports: [
        CommonModule,

        // Angular Material
        MatSnackBarModule,
    ],
    exports: [AlertComponent],
    providers: [],
})
export class CommonComponentsModule {}
