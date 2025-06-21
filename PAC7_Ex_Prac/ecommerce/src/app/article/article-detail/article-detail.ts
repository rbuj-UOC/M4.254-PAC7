import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../model/article';

@Component({
  selector: 'app-article-detail',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './article-detail.html',
  styleUrl: './article-detail.css'
})
export class ArticleDetail implements OnInit {
  private route = inject(ActivatedRoute);

  public article: Article;

  ngOnInit() {
    this.route.data.subscribe((data: { article: Article }) => {
      this.article = data.article;
    });
  }
}
