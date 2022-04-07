import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthGuardService } from './auth/services/guard.service';
import { TokenInterceptor } from './auth/services/interceptor.service';
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
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
