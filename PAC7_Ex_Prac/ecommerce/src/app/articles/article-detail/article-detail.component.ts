import { Component } from '@angular/core';
import { Article } from '../../model/article';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css'
})
export class ArticleDetailComponent {
  public article: Article;

  constructor() { }

}
