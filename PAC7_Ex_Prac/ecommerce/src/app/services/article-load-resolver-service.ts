import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '../model/article';
import { ArticleService } from './article-service';

@Injectable({
  providedIn: 'root'
})
export class ArticleLoadResolverService {
  private articleService = inject(ArticleService);

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Article | Observable<Article> | Promise<Article> {
    const articleId = route.paramMap.get('id');
    return this.articleService.getArticle(articleId);
  }
}
