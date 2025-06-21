import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleDetail } from './article-detail/article-detail';
import { ArticleItem } from './article-item/article-item';
import { ArticleList } from './article-list/article-list';
import { ArticleNew } from './article-new/article-new';
import { ArticleRoutingModule } from './article-routing-module';
import { ImagePipe } from './shared/image-pipe';

@NgModule({
  declarations: [
    ArticleDetail,
    ArticleItem,
    ArticleList,
    ArticleNew,
    ImagePipe
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ArticleModule {}
