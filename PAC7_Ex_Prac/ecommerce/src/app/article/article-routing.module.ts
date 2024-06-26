import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleLoadResolverService } from '../services/article-load-resolver.service';
import { ArticleNewDeactivateGuard } from '../guards/article-new-deactivate.guard';
import { AuthGuard } from '../guards/auth.guard';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleNewComponent } from './article-new/article-new.component';

const routes: Routes = [
  { path: 'detail/:id', component: ArticleDetailComponent, resolve: { article: ArticleLoadResolverService } },
  { path: 'list', component: ArticleListComponent },
  { path: 'create', component: ArticleNewComponent, canActivate: [AuthGuard], canDeactivate: [ArticleNewDeactivateGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
