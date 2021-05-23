import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationBarComponent } from './common/components/navigation-bar/navigation-bar.component';
import { AuthGuardService } from './authentication/auth-guard.service';
import { NonAuthService } from './authentication/non-auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuardService,
    NonAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
