import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleNewGuard } from '../guards/article-new-guard';
import { AuthGuard } from '../guards/auth-guard';
import { ArticleLoadResolverService } from '../services/article-load-resolver-service';
import { ArticleDetail } from './article-detail/article-detail';
import { ArticleList } from './article-list/article-list';
import { ArticleNew } from './article-new/article-new';

const routes: Routes = [
  {
    path: 'detail/:id',
    component: ArticleDetail,
    resolve: { article: ArticleLoadResolverService }
  },
  { path: 'list', component: ArticleList },
  {
    path: 'create',
    component: ArticleNew,
    canActivate: [AuthGuard],
    canDeactivate: [ArticleNewGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule {}
