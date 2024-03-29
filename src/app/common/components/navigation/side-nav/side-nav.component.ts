import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/services/auth.service";
import { GlobalConstants } from "src/app/common/models/global.constants";
import { IUser } from "src/app/common/models/user.model";
import { DataService } from "src/app/common/services/data.service";
import { NavBarService } from "src/app/guest/services/nav-bar.service";

@Component({
    selector: 'centralia-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
    @Output() menuOpen = new EventEmitter();

    public userInfo: IUser;

    constructor(
        private _dataService: DataService, 
        private _router: Router, 
        private _authService: AuthService,
        public _global: GlobalConstants
    ) { }

    public ngOnInit(): void {
        this.getUserInfo();
    }

    public getUserInfo(): void {
        this.userInfo = this._dataService.getUserInfo();
    }

    public isAuthenticated(): boolean {
        return this._authService.isAuthenticated()
    }

    public onMenuItemClick(route: string): void {
        this._router.navigate([route]);
        this.menuOpen.emit('ok');
    }


    logout(event: Event): void {
        this._authService.logout();
        this.menuOpen.emit('ok');
    }
}