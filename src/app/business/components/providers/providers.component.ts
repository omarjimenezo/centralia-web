import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/models/global.constants';
import { IProvider } from 'src/app/common/models/provider.model';

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

  public isMobile: boolean;

  constructor(private _router: Router, private _global: GlobalConstants) { }

  ngOnInit(): void {
    this.isMobile = (window.innerWidth) < 1008;
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = (event.target.innerWidth) < 1008;
  }

  public onProviderCardClick(id: number) {
    this._router.navigate([this._global.ROUTES.BUSINESS.CATALOG, id])
  }

}
