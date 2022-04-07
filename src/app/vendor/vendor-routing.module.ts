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
            expectedRole: 'provider',
        },
        component: VendorComponent,
        children: [
            { path: '', component: OrderComponent },
            { path: 'pedidos', component: OrderComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VendorRoutingModule {}
