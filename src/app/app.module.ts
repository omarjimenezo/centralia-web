import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthGuardService } from './auth/services/guard.service';
import { TokenInterceptor } from './auth/services/interceptor.service';
import { BusinessModule } from './business/business.module';
import { CommonComponentsModule } from './common/common.module';
import { GuestModule } from './guest/guest.module';
import { ProviderModule } from './provider/provider.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,

    // App Modules
    AuthModule,
    GuestModule,
    BusinessModule,
    ProviderModule,
    CommonComponentsModule,
    BrowserAnimationsModule,

    MatSidenavModule
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
