import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { IUser } from 'src/app/common/models/user.model';
import { DataService } from 'src/app/common/services/data.service';
import { UserActionsDialogComponent } from '../user-actions-dialog/user-actions-dialog.component';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
    public user: IUser;
    constructor(private _dataService: DataService, private _bottomSheet: MatBottomSheet) { }

    public ngOnInit(): void {
        this.user = this._dataService.getUserInfo();
    }

    public openUserActionsDialog(): void {
        this._bottomSheet.open(UserActionsDialogComponent);
    }
}
