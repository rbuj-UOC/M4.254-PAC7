import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleNew } from '../article/article-new/article-new';

@Injectable()
export class ArticleNewGuard implements CanDeactivate<ArticleNew> {
  canDeactivate(
    component: ArticleNew,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return window.confirm('Do you want to navigate away from this page?');
  }
}
