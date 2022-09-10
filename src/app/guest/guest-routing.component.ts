import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvidersInfoComponent } from './components/info/providers/providers-info.component';
import { ProvidersComponent } from '../common/components/providers/providers.component';
import { GuestComponent } from './guest.component';
import { CatalogComponent } from '../common/components/catalog/catalog.component';

const routes: Routes = [
    {
        path: '',
        component: GuestComponent,
        children: [
            {
                path: '',
                component: ProvidersComponent,
            },
            {
                path: 'proveedores',
                component: ProvidersComponent,
            },
            {
                path: 'catalogo/:id',
                component: CatalogComponent,
            },
            {
                path: 'info/provedor', 
                component: ProvidersInfoComponent
            },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GuestRoutingModule {}
