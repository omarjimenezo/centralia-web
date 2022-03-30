import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatSnackBarModule
} from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
    declarations: [AlertComponent],
    imports: [
        CommonModule,

        // Angular Material
        MatSnackBarModule,
    ],
    exports: [AlertComponent],
    providers: [CookieService],
})
export class CommonComponentsModule {}
