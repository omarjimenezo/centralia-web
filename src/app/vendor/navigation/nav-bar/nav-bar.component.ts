import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IUser } from 'src/app/common/models/user.model';
import { UserActionsDialogComponent } from '../user-actions-dialog/user-actions-dialog.component';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
    public userInfo: IUser;
    constructor(private _authService: AuthService, private _bottomSheet: MatBottomSheet) {}

    public ngOnInit(): void {
        this.userInfo = this._authService.getUserInfo();
    }

    public openUserActionsDialog(): void {
        this._bottomSheet.open(UserActionsDialogComponent);
    }
}
