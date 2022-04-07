import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { NotFoundComponent } from './auth/components/not-found/not-found.component';
import { AuthGuardService as AuthGuard } from './auth/services/guard.service';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'login', component: LoginComponent },

    {
        path: 'cliente',
        canActivate: [AuthGuard],
        data: {
            expectedRole: 'user',
        },
        loadChildren: () =>
            import('./client/client.module').then((m) => m.ClientModule),
    },
    {
        path: 'vendedor',
        canActivate: [AuthGuard],
        data: {
            expectedRole: 'provider',
        },
        loadChildren: () =>
            import('./vendor/vendor.module').then((m) => m.VendorModule),
    },

    { path: '**', component: NotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
