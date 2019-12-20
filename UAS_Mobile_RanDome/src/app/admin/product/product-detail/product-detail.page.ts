import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from 'src/app/service/product.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  product: Product = {
    brand: '',
    subBrand: '',
    description: '',
    imageUrl: '',
    price: null
  };
  productId: null;

  constructor( 
    private productSvc: ProductService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('productId')) {
        this.navCtrl.navigateBack('/home');
        return;
      }
      this.productId = this.route.snapshot.params['productId'];
      console.log('ID : ' + this.productId);
      this.load();
    });
  }

  async load() {
    const loading = await this.loadingController.create({
      message: 'Loading Product...'
    });
    await loading.present();

    this.productSvc.getProduct(this.productId).subscribe(res => {
      if(!res){
        this.navCtrl.navigateBack('/admin/tabs/product');
        loading.dismiss();
      } else {
        this.product = res;
        console.log(res);
        console.log(this.product);
        loading.dismiss();
      }
    });
  }

}
