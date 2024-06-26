import { Component } from '@angular/core';
import { Article } from '../../model/article';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../serveis/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css'
})
export class ArticleDetailComponent {
  public article: Article;
  constructor(private articleService: ArticleService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const articleCode = this.route.snapshot.paramMap.get('id');
    this.articleService.getArticle(articleCode).subscribe(article => this.article = article);
  }

}
