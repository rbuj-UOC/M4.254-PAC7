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
import { AuthService } from './serveis/auth.service';
import { AuthStoreService } from './serveis/auth-store.service';
import { ImagePipe } from '../shared/image.pipe';
import { NavbarComponent } from './articles/navbar/navbar.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AuthInterceptor } from './serveis/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ArticleDetailComponent,
    ArticleItemComponent,
    ArticleListComponent,
    ArticleNewComponent,
    ImagePipe,
    LoginComponent,
    NavbarComponent,
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
    AuthService,
    AuthStoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
