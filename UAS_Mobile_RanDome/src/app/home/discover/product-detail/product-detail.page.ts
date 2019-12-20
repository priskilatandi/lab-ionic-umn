import { AuthService } from 'src/app/auth/auth.service';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from 'src/app/service/product.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FavouriteService, Favourite } from 'src/app/service/favourite.service';
import * as firebase from 'firebase/app';


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
  favourite: Favourite = {
    favId: '',
    brand: '',
    subBrand: '',
    description: '',
    imageUrl: '',
    price: null
  };
  productId: any;
  productID: any;
  isFavourite: boolean;
  uid : any;
  loading : any;
  userCollection : AngularFirestoreCollection;
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private authSvc: AuthService,
    private productSvc: ProductService,
    private favouriteSvc: FavouriteService,
    private loadingController: LoadingController,
    private db : AngularFirestore
  ) { }

  ngOnInit() {
    this.uid = this.authSvc.userId;
    this.userCollection = this.db.collection('Users');
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('productId')) {
        this.navCtrl.navigateBack('/home');
        return;
      }
      this.productId = this.route.snapshot.params['productId'];
      console.log('ID : ' + this.productId);

      this.db.collection('Users',ref => ref.where('id','==',this.uid))
    .get()
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(doc =>{
        this.productID = doc.data().favorite;
          this.db.collection('Products').doc(this.productId).get().toPromise().then(doc =>{
              let dat = {
                id : doc.id,
                brand : doc.data().brand,
                subBrand : doc.data().subBrand,
                description : doc.data().description,
                imageUrl : doc.data().imageUrl,
                price : doc.data().price
              };
              console.log(dat.id);
              console.log(this.productId);
              if(dat.id == this.productId){
                this.isFavourite = true;
                console.log('Favourited');
              } else {
                this.isFavourite = false;
                console.log('Unfavourited');
              }
          });
      });
    });
      
      this.db.collection('Users',ref => ref.where('id', '==', this.uid))
      .get()
      .toPromise()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id);
          this.db.doc<any>('Users/'+ doc.id).get().subscribe(res => {
            console.log(res);
            // if(res.id != this.productId){
            //   this.isFavourite = false;
            //   console.log('Unfavourited');
            // } else {
            //   this.isFavourite = true;
            //   console.log('Favourited');
            // }
          })
        })
      });

      // this.favouriteSvc.getFavourite(this.productId).subscribe(res => {
      //   if(!res){
      //     this.isFavourite = false;
      //     console.log('Unfavourited');
      //   } else {
      //     this.isFavourite = true;
      //     console.log('Favourited');
      //   }
      // });
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
        this.navCtrl.navigateBack('/home');
        loading.dismiss();
      } else {
        this.product = res;
        console.log(res);
        console.log(this.product);
        loading.dismiss();
      }
    });
  }

  Favourite(item) {
    this.isFavourite = !this.isFavourite;
    if(!this.isFavourite){
      console.log('unsave product');
      console.log("ID : " + item.id);
      this.removeFav(item);
      // this.reviewSvc.removeJoin(p.id);
    } else {
      console.log('saving product');
      this.favourite = this.product;
      this.favourite.favId = this.productId;
      console.log(this.favourite);
      this.saveFav();
    }
  }

  async saveFav() {
    const loading = await this.loadingController.create({
      message: 'Saving your favorite...'
    });
    await loading.present();

    if(!this.productId) {
      console.log('1');
      this.favouriteSvc.updateFavourite(this.favourite, this.productId).then(() =>{
        loading.dismiss();
      })
    } else {
      let id ;
      console.log('2');
      console.log(this.authSvc.userId);
      this.db.collection('Users',ref => ref.where('id', '==', this.uid))
      .get()
      .toPromise()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id);
          this.db.doc<any>('Users/'+ doc.id).update(
            {'favorite' : firebase.firestore.FieldValue.arrayUnion(this.productId)}
          );
        })
      });
      
      /*this.favouriteSvc.addFavourite(this.favourite, this.productId).then(() => {
        loading.dismiss();
      })*/
    }
    loading.dismiss();
  }

  async removeFav(item) {
    console.log(item);
    this.loading = await this.loadingController.create({
      message : 'Removing your favorite...',
    });
    (await this.loading).present();
    console.log(item.id);
    this.db.collection('Users',ref => ref.where('id', '==', this.uid))
    .get()
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id);
        this.db.doc<any>('Users/'+ doc.id).update(
          {'favorite' : firebase.firestore.FieldValue.arrayRemove(this.productId)}
        );
        console.log("deleted");
        this.loading.dismiss();
      })
    });
  }
}
