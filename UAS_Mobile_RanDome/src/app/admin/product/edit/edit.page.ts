import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from 'src/app/service/product.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Plugins, Capacitor, CameraSource, CameraResultType } from '@capacitor/core'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  product: Product = {
    brand: '',
    subBrand: '',
    description: '',
    imageUrl: '',
    price: null
  };

  productId = null;
  selectedImage: string;

  constructor(
    private productSvc: ProductService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('productId')) {
        this.navCtrl.navigateBack('/admin/tabs/product');
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
      this.product = res;
      loading.dismiss();
    });
  }

  async save() {
    const loading = await this.loadingController.create({
      message: 'Updating Product...'
    });
    await loading.present();

    if(this.productId){
      this.productSvc.updateProduct(this.product, this.productId).then(() => {
        loading.dismiss();
        this.navCtrl.navigateBack('admin/tabs/product');
      })
    } else {
      this.productSvc.addProduct(this.product).then(() => {
        loading.dismiss();
        this.navCtrl.navigateBack('admin/tabs/product');
      })
    }
  }

  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 90,
      source: CameraSource.Prompt,
      resultType: CameraResultType.Uri,
      correctOrientation: true
    });
    this.selectedImage = image.webPath;
  }

  onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      return;
    } else {
      this.takePicture();
    }
  }
}
