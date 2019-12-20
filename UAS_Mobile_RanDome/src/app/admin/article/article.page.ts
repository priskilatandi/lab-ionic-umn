import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Article, ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

  articles: Article[];

  constructor(
    private articleSvc: ArticleService,
    private router: Router, 
    private authSvc: AuthService
  ) { }

  ngOnInit() {
    this.articleSvc.getArticles().subscribe(res => {
      this.articles = res;
    });
  }

  remove(item) {
    this.articleSvc.removeArticle(item.id);
  }

  onLogout() {
    this.authSvc.logout();
    this.router.navigateByUrl('/auth');
  }

}
