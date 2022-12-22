import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductModule } from './product/product.module';
import { MaterialModule } from './material/material/material.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { HttpClientModule } from '@angular/common/http'
import {AppRoutingModule} from './app-routing.module';
import { UserModule } from './user/user.module'

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MainNavComponent
  ],
    imports: [
        BrowserModule,
        ProductModule,
        MaterialModule,
        HttpClientModule,
        UserModule,
      AppRoutingModule,
    ],
  providers: [], //httpInterceptorProviders
  bootstrap: [AppComponent]
})
export class AppModule { }
