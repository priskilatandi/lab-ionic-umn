import { Component, OnInit } from '@angular/core';
import { Article, ArticleService } from 'src/app/service/article.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ProductService, Product } from 'src/app/service/product.service';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  category: string = "discover";
  article: Article = {
    title: '',
    description: '',
    imageUrl: ''
  };
  articles: Article[];
  product: Product[];

  constructor(
    private articleSvc: ArticleService,
    private productSvc: ProductService,
  ) { }

  ngOnInit() {
    this.articleSvc.getArticles().subscribe(res => {
      this.article = res[0];
      console.log(this.article);
      this.articles = res.slice(1);
    });
    this.productSvc.getProducts().subscribe(res=> {
      this.product = res;
    });
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }

  getItems(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.product = this.product.filter((rev) => {
        return (rev.brand.toLowerCase().indexOf(val.toLowerCase()) > -1 || rev.subBrand.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.productSvc.getProducts().subscribe(res => {
        this.product = res;
      });
    }
  }

}
