import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { CommonComponentsModule } from './common/common.module';
import { VendorModule } from './vendor/vendor.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,

    // App Modules
    AuthModule,
    ClientModule,
    VendorModule,
    CommonComponentsModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
