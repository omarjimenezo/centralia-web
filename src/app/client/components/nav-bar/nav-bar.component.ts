import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavBarService } from '../../services/nav-bar.service';
import { NavMenu } from '../../models/nav-bar.model';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
    public navMenu: NavMenu[] = [];

    constructor(private _router: Router, private _menuService: NavBarService) {}

    public ngOnInit(): void {
        this.getMenu();
    }

    public getMenu(): void {
        this._menuService.getNavMenu().subscribe((result) => {
            this.navMenu = result;
        });
    }

    public onDashboardClick(): void {
        this._router.navigate(['client/dashboard']);
    }

    public onProductsClick(): void {
        this._router.navigate(['client/products']);
    }

    public onLogoutClick(): void {
        this._router.navigate(['login']);
    }
}
