import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/common/models/user.model';
import { AuthService } from 'src/app/auth/components/services/auth.service';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
    public userInfo: IUser;
    constructor(private _authService: AuthService) {}

    public ngOnInit(): void {
        
        this.userInfo = this._authService.getUserInfo();
        
    }
}
