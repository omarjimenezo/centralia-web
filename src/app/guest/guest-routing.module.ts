import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../auth/services/guard.service';
import { CatalogComponent } from '../business/components/catalog/catalog.component';
import { OrderComponent } from '../business/components/order/order.component';
import { ProvidersComponent } from '../business/components/providers/providers.component';
import { GuestComponent } from './guest.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        data: {
            expectedRole: [3],
        },
        component: GuestComponent,
        children: [
            {
                path: '',
                canActivate: [AuthGuard],
                data: {
                    expectedRole: [0],
                },
                component: ProvidersComponent,
            },
            {
                path: 'proveedores',
                canActivate: [AuthGuard],
                data: {
                    expectedRole: [0],
                },
                component: ProvidersComponent,
            },
            {
                path: 'catalogo/:id',
                canActivate: [AuthGuard],
                data: {
                    expectedRole: [0],
                },
                component: CatalogComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientRoutingModule {}
