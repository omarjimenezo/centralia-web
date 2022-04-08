import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../auth/services/guard.service';
import { ClientComponent } from './client.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProvidersComponent } from './components/providers/providers.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        data: {
            expectedRole: 'user',
        },
        component: ClientComponent,
        children: [
            {
                path: '',
                canActivate: [AuthGuard],
                data: {
                    expectedRole: 'user',
                },
                component: ProvidersComponent,
            },
            {
                path: 'proveedores',
                canActivate: [AuthGuard],
                data: {
                    expectedRole: 'user',
                },
                component: ProvidersComponent,
            },
            {
                path: 'catalogo/:id',
                canActivate: [AuthGuard],
                data: {
                    expectedRole: 'user',
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
