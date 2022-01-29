import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,

    // App Modules
    AuthModule,
    ClientModule,
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
