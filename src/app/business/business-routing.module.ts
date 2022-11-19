import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../auth/services/guard.service';
import { ProductsComponent } from '../common/components/products/products.component';
import { ProvidersComponent } from '../common/components/providers/providers.component';
import { BusinessComponent } from './business.component';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        data: {
            expectedRole: [2],
        },
        component: BusinessComponent,
        children: [
            {
                path: '',
                canActivate: [AuthGuard],
                data: {
                    expectedRole: [2],
                },
                component: ProvidersComponent,
            },
            {
                path: 'proveedores',
                canActivate: [AuthGuard],
                data: {
                    expectedRole: [2],
                },
                component: ProvidersComponent,
            },
            {
                path: 'productos/:id',
                canActivate: [AuthGuard],
                data: {
                    expectedRole: [2],
                },
                component: ProductsComponent,
            },
            {
                path: 'pedidos',
                canActivate: [AuthGuard],
                data: {
                    expectedRole: [2],
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
export class ClientRoutingModule {
}
