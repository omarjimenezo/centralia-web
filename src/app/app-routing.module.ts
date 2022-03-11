import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { NotFoundComponent } from './auth/components/not-found/not-found.component';
import { ClientComponent } from './client/client.component';
import { VendorComponent } from './vendor/vendor.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'login', component: LoginComponent },

    {
      path: 'cliente',
      loadChildren: () =>
        import('./client/client.module').then((m) => m.ClientModule),
    },
    {
      path: 'vendedor',
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
