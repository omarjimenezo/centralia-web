import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { NotFoundComponent } from './auth/components/not-found/not-found.component';
import { AuthGuardService as AuthGuard } from './auth/services/guard.service';

const routes: Routes = [
    { path: '', redirectTo: 'invitado/info/general', pathMatch: 'full' },

    { path: 'login', component: LoginComponent },
    {
        path: 'invitado',
        loadChildren: () =>
            import('./guest/guest.module').then((m) => m.GuestModule),
    },
    {
        path: 'negocio',
        canActivate: [AuthGuard],
        data: {
            expectedRole: [2],
        },
        loadChildren: () =>
            import('./business/business.module').then((m) => m.BusinessModule),
    },
    {
        path: 'proveedor',
        canActivate: [AuthGuard],
        data: {
            expectedRole: [1, 3],
        },
        loadChildren: () =>
            import('./provider/provider.module').then((m) => m.ProviderModule),
    },

    { path: '**', component: NotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
