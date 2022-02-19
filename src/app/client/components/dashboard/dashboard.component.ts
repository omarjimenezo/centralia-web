import { Component, HostListener, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IProvider } from '../../models/provider.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public providers: IProvider[] = [
    {
      id: 2,
      address: 'Col. Americana, CP. 45130 Zapopan, Jalisco',
      img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      name: 'Abastecedora "La Cima"',
      rating: 4.5,
      description: 'Productos en General'
    },
    {
      id: 3,
      name: 'Surtidora "Los Lopez"',
      address: 'Col. Centro, CP. 45145 Guadalajara, Jalisco',
      img: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      rating: 3.5,
      description: 'Productos en General'
    },
    {
      id: 3,
      name: 'Surtidora "Los Lopez"',
      address: 'Col. Centro, CP. 45145 Guadalajara, Jalisco',
      img: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      rating: 3.5,
      description: 'Productos en General'
    },
  ];

  public isMobile: boolean;

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.isMobile = (window.innerWidth) < 1008;
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = (event.target.innerWidth) < 1008;
  }

  public onProviderCardClick(id: number) {
    this._router.navigate([`/cliente/catalogo/${id}`])
  }

}
