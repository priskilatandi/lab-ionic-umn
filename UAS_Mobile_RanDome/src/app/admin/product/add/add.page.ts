import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from 'src/app/service/product.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  product: Product = {
    brand: '',
    subBrand: '',
    description: '',
    imageUrl: '',
    price: null
  };

  productId = null;

  constructor(
    private productSvc: ProductService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];
    if(this.productId) {
      this.load();
    }
  }

  async load() {
    const loading = await this.loadingController.create({
      message: 'Loading Product...'
    });
    await loading.present();

    this.productSvc.getProduct(this.productId).subscribe(res => {
      loading.dismiss();
      this.product = res;
    });
  }

  async save() {
    const loading = await this.loadingController.create({
      message: 'Saving Product...'
    });
    await loading.present();

    if(this.productId){
      this.productSvc.updateProduct(this.product, this.productId).then(() => {
        loading.dismiss();
        this.navController.navigateBack('admin/tabs/product');
      })
    } else {
      this.productSvc.addProduct(this.product).then(() => {
        loading.dismiss();
        this.navController.navigateBack('admin/tabs/product');
      })
    }
  }

}
