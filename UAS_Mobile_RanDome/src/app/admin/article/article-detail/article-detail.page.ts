import { Component, OnInit } from '@angular/core';
import { Article, ArticleService } from 'src/app/service/article.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.page.html',
  styleUrls: ['./article-detail.page.scss'],
})
export class ArticleDetailPage implements OnInit {
  
  article: Article = {
    title: '',
    description: '',
    imageUrl: ''
  };
  articleId: null;

  constructor( 
    private articleSvc: ArticleService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('articleId')) {
        this.navCtrl.navigateBack('/admin');
        return;
      }
      this.articleId = this.route.snapshot.params['articleId'];
      console.log('ID : ' + this.articleId);
      this.load();
    });
  }

  async load() {
    const loading = await this.loadingController.create({
      message: 'Loading Article...'
    });
    await loading.present();

    this.articleSvc.getArticle(this.articleId).subscribe(res => {
      if(!res){
        this.navCtrl.navigateBack('/admin/tabs/article');
        loading.dismiss();
      } else {
        this.article = res;
        console.log(res);
        console.log(this.article);
        loading.dismiss();
      }
    });
  }
}
