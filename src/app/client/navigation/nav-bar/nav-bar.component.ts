import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavBarService } from '../../services/nav-bar.service';
import { NavMenu } from '../../models/nav-bar.model';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
    @Output() menuOpen = new EventEmitter();

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

    public onMenuOpen(): void {
        this.menuOpen.emit('ok');
        console.log('openmenu')
    }

    public onLogoutClick(): void {
        this._router.navigate(['login']);
    }
}
