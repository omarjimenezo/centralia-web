import { Inject, Injectable } from '@angular/core';
import {
    MatSnackBar,
    MatSnackBarRef,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { IAlertInfo } from 'src/app/business/models/alert.model';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    constructor(private _snackBar: MatSnackBar) {}

    public openAlert(
        message: string,
        type: number = 0,
        duration: number = 3000,
        position: MatSnackBarVerticalPosition = 'top'
    ) {
        let panelClass: string = '';
        switch (type) {
            case 0:
                panelClass = 'mat-snackbar-sucess';
                break;
            case 1:
                panelClass = 'mat-snackbar-error';
                break;
            case 2:
                panelClass = 'mat-snackbar-alert';
                break;
            case 3:
                panelClass = 'mat-snackbar-info';
                break;
        }

        this._snackBar.open(message, 'X', {
            duration: duration,
            panelClass: [panelClass],
            horizontalPosition: 'center',
            verticalPosition: position,
        });
    }
}
