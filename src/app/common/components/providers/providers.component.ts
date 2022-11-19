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

//   public providers: IProvider[] = [
//     {
//       id: 2,
//       nombre: 'Abarrotera el Pinar',
//       calle: 'Col. Americana, CP. 45130 Zapopan, Jalisco',
//       logo: './assets/img/providers/abarrotera_el_pinar.jpg',
//       calificacion: 4.5,
//       tipo: 'Abarrotes'
//     },
//     {
//       id: 10,
//       nombre: 'Tortillas de Avena',
//       calle: 'Col. Americana, CP. 45130 Zapopan, Jalisco',
//       logo: './assets/img/providers/tortillas.jpg',
//       calificacion: 4.5,
//       tipo: 'Tortillas'
//     },
//     {
//       id: 11,
//       nombre: 'Don Cacahuate',
//       calle: 'Col. Americana, CP. 45130 Zapopan, Jalisco',
//       logo: './assets/img/providers/cacahuates.jpg',
//       calificacion: 4.5,
//       tipo: 'Botanas'
//     },
//     {
//       id: 12,
//       nombre: 'Aguas Doña Graciela',
//       calle: 'Col. Americana, CP. 45130 Zapopan, Jalisco',
//       logo: './assets/img/providers/frescas.jpg',
//       calificacion: 4.5,
//       tipo: 'Aguas Frescas'
//     },
//     {
//       id: 13,
//       nombre: 'Panadería Bakery',
//       calle: 'Col. Americana, CP. 45130 Zapopan, Jalisco',
//       logo: './assets/img/providers/panaderia.jpg',
//       calificacion: 4.5,
//       tipo: 'Panadería'
//     },
//   ];

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

  public onProviderCardClick(id: number) {
      this._router.navigate([this._global.ROUTES.COMMON.PRODUCTS, id]);
  }

}
