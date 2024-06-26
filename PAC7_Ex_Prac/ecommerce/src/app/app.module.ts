import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ArticleDetailComponent } from './articles/article-detail/article-detail.component';
import { ArticleItemComponent } from './articles/article-item/article-item.component';
import { ArticleListComponent } from './articles/article-list/article-list.component';
import { ArticleNewComponent } from './articles/article-new/article-new.component';
import { ArticleNewDeactivateGuard } from './guards/article-new-deactivate.guard';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './serveis/auth.interceptor';
import { AuthService } from './serveis/auth.service';
import { AuthStoreService } from './serveis/auth-store.service';
import { ImagePipe } from '../shared/image.pipe';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { LocalStorageService } from './serveis/local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    ArticleDetailComponent,
    ArticleItemComponent,
    ArticleListComponent,
    ArticleNewComponent,
    ImagePipe,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ArticleNewDeactivateGuard,
    AuthGuard,
    AuthService,
    AuthStoreService,
    LocalStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
