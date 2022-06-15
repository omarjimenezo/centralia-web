import { Component, OnInit } from '@angular/core';
import {
    MatBottomSheetRef
} from '@angular/material/bottom-sheet';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
    selector: 'user-actions-dialog',
    templateUrl: './user-actions-dialog.component.html',
})
export class UserActionsDialogComponent implements OnInit {
    public ngOnInit(): void {}

    constructor(
        private _bottomSheetRef: MatBottomSheetRef<UserActionsDialogComponent>,
        private _authService: AuthService
    ) {}

    logout(event: MouseEvent): void {
        this._authService.logout();
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }
}
