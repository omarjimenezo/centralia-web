import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../auth/services/guard.service';
import { OrderComponent } from './components/order/order.component';
import { VendorComponent } from './vendor.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        data: {
            expectedRole: [1, 2],
        },
        component: VendorComponent,
        children: [
            {
                path: '',
                canActivate: [AuthGuard],
                data: {
                    expectedRole: [1, 2],
                },
                component: OrderComponent,
            },
            {
                path: 'pedidos',
                canActivate: [AuthGuard],
                data: {
                    expectedRole: [1, 2],
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
export class VendorRoutingModule {}
