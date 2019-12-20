import { Component, OnInit } from '@angular/core';
import { Article, ArticleService } from 'src/app/service/article.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

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
      this.loadArticle();
    });
  }

  async loadArticle() {
    const loading = await this.loadingController.create({
      message: 'Loading Article...'
    });
    await loading.present();

    this.articleSvc.getArticle(this.articleId).subscribe(res => {
      loading.dismiss();
      this.article = res;
    });
  }

  async saveArticle() {
    const loading = await this.loadingController.create({
      message: 'Updating Article...'
    });
    await loading.present();

    if(this.articleId){
      this.articleSvc.updateArticle(this.article, this.articleId).then(() => {
        loading.dismiss();
        this.navCtrl.navigateBack('admin');
      })
    } else {
      this.articleSvc.addArticle(this.article).then(() => {
        loading.dismiss();
        this.navCtrl.navigateBack('admin');
      })
    }
  }

}
