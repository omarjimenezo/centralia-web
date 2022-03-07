import { Inject, Injectable } from '@angular/core';
import {
    MatSnackBar,
    MatSnackBarRef,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { IAlertInfo } from 'src/app/client/models/alert.model';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    constructor(private _snackBar: MatSnackBar) {}

    public openAlert(
        message: string,
        alertInfo: IAlertInfo,
        duration: number = 3000
    ) {
        let panelClass: string = '';
        let position: MatSnackBarVerticalPosition = 'top';
        switch (alertInfo.type) {
            case 'success':
                panelClass = 'mat-snackbar-sucess';
                break;
            case 'error':
                panelClass = 'mat-snackbar-error';
                break;
            case 'alert':
                panelClass = 'mat-snackbar-alert';
                break;
            case 'info':
                panelClass = 'mat-snackbar-info';
                break;
        }

        switch (alertInfo.screen) {
            case 'catalog':
                position = 'bottom';
        }

        this._snackBar.open(message, 'X', {
            duration: duration,
            panelClass: [panelClass],
            horizontalPosition: 'center',
            verticalPosition: position,
        });
    }
}
