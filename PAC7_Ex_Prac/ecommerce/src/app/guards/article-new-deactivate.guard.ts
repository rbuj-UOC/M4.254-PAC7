import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot
} from '@angular/router';
import { ArticleNewComponent } from '../article/article-new/article-new.component';
import { Observable } from 'rxjs';

@Injectable()
export class ArticleNewDeactivateGuard
  implements CanDeactivate<ArticleNewComponent>
{
  canDeactivate(
    component: ArticleNewComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return window.confirm('Do you want to navigate away from this page?');
  }
}
