import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from '../../model/article';
import { NameArticleValidator } from '../validators/name-article-validator.directive';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-new',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './article-new.component.html',
  styleUrl: './article-new.component.css'
})
export class ArticleNewComponent {
  @Output() private articleCreated = new EventEmitter<void>();

  public message = '';
  public articleForm: FormGroup;

  constructor(
    private articleService: ArticleService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  get name() {
    return this.articleForm.get('name');
  }

  get price() {
    return this.articleForm.get('price');
  }

  get imageUrl() {
    return this.articleForm.get('imageUrl');
  }

  get isOnSale() {
    return this.articleForm.get('isOnSale');
  }

  createForm() {
    this.articleForm = this.fb.group({
      name: [
        '',
        [Validators.required, NameArticleValidator(/(Prova|Test|Mock|Fake)/)]
      ],
      price: [0, [Validators.required, Validators.min(0.1)]],
      imageUrl: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^http(s?)://[a-zA-Z0-9.]+(.[a-zA-Z]{2,3})?(:[0-9]+)?(/[a-zA-Z0-9.-]+)+'
          )
        ]
      ],
      isOnSale: false
    });
  }

  createArticle() {
    if (this.articleForm.invalid) {
      this.message = 'Corregiu tots els errors i torneu a enviar el formulari';
    } else {
      const article: Article = this.articleForm.value;
      this.message = '';
      this.articleService.createArticle(article).subscribe(
        (res) => {
          this.message = 'Item successfully created.';
          console.log('Triggered event emitter');
          this.articleCreated.next();
        },
        (err) => {
          this.message = 'No es pot crear l`element, torneu-ho a provar.';
        }
      );
    }
  }
}
