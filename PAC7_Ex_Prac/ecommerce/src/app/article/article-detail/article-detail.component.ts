import { Component, OnInit } from '@angular/core';
import { Article } from '../../model/article';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-detail',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css'
})
export class ArticleDetailComponent implements OnInit {
  public article: Article;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data: { article: Article }) => {
      this.article = data.article;
    });
  }
}
