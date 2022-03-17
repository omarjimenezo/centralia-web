import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ProvidersComponent } from './components/providers/providers.component';
import { CatalogComponent } from './components/catalog/catalog.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      { path: '', component: ProvidersComponent },
      { path: 'proveedores', component: ProvidersComponent },
      { path: 'catalogo/:id', component: CatalogComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
