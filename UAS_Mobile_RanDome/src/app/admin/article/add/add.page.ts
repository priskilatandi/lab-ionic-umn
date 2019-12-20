import { Component, OnInit } from '@angular/core';
import { ArticleService, Article } from 'src/app/service/article.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  article: Article = {
    title: '',
    description: '',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDu9fmDnoKaYJ65ICttx9tN12smHN5vPS4ZGbXlTmyB5iN7jox'
  };

  articleId: null;

  constructor(
    private articleSvc: ArticleService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.articleId = this.route.snapshot.params['id'];
    if (this.articleId) {
      this.loadArticle();
    }
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
      message: 'Saving Article...'
    });
    await loading.present();

    if(this.articleId){
      this.articleSvc.updateArticle(this.article, this.articleId).then(() => {
        loading.dismiss();
        this.navController.navigateBack('admin');
      })
    } else {
      this.articleSvc.addArticle(this.article).then(() => {
        loading.dismiss();
        this.navController.navigateBack('admin');
      })
    }
  }

}
