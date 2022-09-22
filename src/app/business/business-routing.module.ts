import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../auth/services/guard.service';
import { CatalogComponent } from '../common/components/catalog/catalog.component';
import { ProvidersComponent } from '../common/components/providers/providers.component';
import { BusinessComponent } from './business.component';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        data: {
            expectedRole: [3],
        },
        component: BusinessComponent,
        children: [
            {
                path: '',
                canActivate: [AuthGuard],
                data: {
                    expectedRole: [3],
                },
                component: ProvidersComponent,
            },
            {
                path: 'proveedores',
                canActivate: [AuthGuard],
                data: {
                    expectedRole: [3],
                },
                component: ProvidersComponent,
            },
            {
                path: 'catalogo/:id',
                canActivate: [AuthGuard],
                data: {
                    expectedRole: [3],
                },
                component: CatalogComponent,
            },
            {
                path: 'pedidos',
                canActivate: [AuthGuard],
                data: {
                    expectedRole: [3],
                },
                component: OrderComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientRoutingModule {}
