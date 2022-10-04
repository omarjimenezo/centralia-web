import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../auth/services/guard.service';
import { OrderComponent } from './components/order/order.component';
import { ProviderComponent } from './provider.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        data: {
            expectedRole: [1, 3],
        },
        component: ProviderComponent,
        children: [
            {
                path: '',
                canActivate: [AuthGuard],
                data: {
                    expectedRole: [1, 3],
                },
                component: OrderComponent,
            },
            {
                path: 'pedidos',
                canActivate: [AuthGuard],
                data: {
                    expectedRole: [1, 3],
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
export class ProviderRoutingModule {}
