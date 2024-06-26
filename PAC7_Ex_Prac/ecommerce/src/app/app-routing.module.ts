import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ArticleListComponent } from './articles/article-list/article-list.component';
import { ArticleNewComponent } from './articles/article-new/article-new.component';
import { ArticleNewDeactivateGuard } from './guards/article-new-deactivate.guard';
import { ArticleDetailComponent } from './articles/article-detail/article-detail.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'article/:id', component: ArticleDetailComponent },
  { path: 'articles/list', component: ArticleListComponent },
  { path: 'articles/create', component: ArticleNewComponent, canActivate: [AuthGuard], canDeactivate: [ArticleNewDeactivateGuard] },
  { path: '**', redirectTo: '/register' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
