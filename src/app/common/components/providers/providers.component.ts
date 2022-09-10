import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GlobalConstants } from '../../models/global.constants';
import { IProvider } from '../../models/provider.model';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {

  public providers: IProvider[] = [
    {
      id: 2,
      name: 'Abarrotera el Pinar',
      address: 'Col. Americana, CP. 45130 Zapopan, Jalisco',
      img: './assets/img/providers/abarrotera_el_pinar.jpg',
      rating: 4.5,
      description: 'Productos en General'
    },
  ];

  public isAuthenticated: boolean;

  constructor(
    private _router: Router,
    private _global: GlobalConstants,
    private _authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this._authService.isAuthenticated();
  }

  public onProviderCardClick(id: number) {
    (this.isAuthenticated) ?
      this._router.navigate([this._global.ROUTES.BUSINESS.CATALOG, id]) :
      this._router.navigate([this._global.ROUTES.GUEST.CATALOG, id]);
  }

}
