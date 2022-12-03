import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GlobalConstants } from '../../models/global.constants';
import { IProvider, IProviderResponse } from '../../models/provider.model';
import { ProviderService } from '../../services/providers.service';

@Component({
    selector: 'app-providers',
    templateUrl: './providers.component.html',
    styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {

    public providers: IProvider[];

    public isAuthenticated: boolean;

    constructor(
        private _router: Router,
        private _global: GlobalConstants,
        private _authService: AuthService,
        private _providerService: ProviderService,
    ) { }

    ngOnInit(): void {
        this.isAuthenticated = this._authService.isAuthenticated();
        this._providerService.getProviders().subscribe(
            (providers: IProviderResponse) => {
                this.providers = providers.data;
            });
    }

    public onProviderCardClick(id: string) {
        this._router.navigate([this._global.ROUTES.COMMON.PRODUCTS, id]);
    }

}
