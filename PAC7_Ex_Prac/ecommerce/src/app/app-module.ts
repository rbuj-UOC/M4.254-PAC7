import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
import { ArticleNewGuard } from './guards/article-new-guard';
import { AuthGuard } from './guards/auth-guard';
import { AuthInterceptor } from './services/auth-interceptor';
import { AuthService } from './services/auth-service';
import { AuthStoreService } from './services/auth-store-service';
import { LocalStorageService } from './services/local-storage-service';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    ArticleNewGuard,
    AuthGuard,
    AuthService,
    AuthStoreService,
    LocalStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [App]
})
export class AppModule {}
