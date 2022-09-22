import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvidersInfoComponent } from './components/info/providers-info/providers-info.component';
import { ProvidersComponent } from '../common/components/providers/providers.component';
import { GuestComponent } from './guest.component';
import { CatalogComponent } from '../common/components/catalog/catalog.component';
import { GeneralInfoComponent } from './components/info/general-info/general-info.component';
import { BusinessInfoComponent } from './components/info/business-info/business-info.component';

const routes: Routes = [
    {
        path: '',
        component: GuestComponent,
        children: [
            {
                path: '',
                component: GeneralInfoComponent,
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
                path: 'info/general', 
                component: GeneralInfoComponent
            },
            {
                path: 'info/proveedores', 
                component: ProvidersInfoComponent
            },
            {
                path: 'info/negocios', 
                component: BusinessInfoComponent
            },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GuestRoutingModule {}
