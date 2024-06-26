import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Article } from '../model/article';
import { ArticleService } from '../serveis/article.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleLoadResolverService implements Resolve<Article> {

  constructor(private articleService: ArticleService) { }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Article | Observable<Article> | Promise<Article> {
    const articleId = route.paramMap.get('id');
    return this.articleService.getArticle(articleId);
  }
}
