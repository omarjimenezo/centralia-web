import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { NotFoundComponent } from './auth/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'cliente', pathMatch: 'full' },
  
  // Login desactivado en la primera etapa
  // { path: 'login', component: LoginComponent },

  {
    path: 'cliente',
    loadChildren: () =>
      import('./client/client.module').then((m) => m.ClientModule),
  },

  { path: '**', component: NotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
