import { LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Favourite, FavouriteService } from 'src/app/service/favourite.service';
import { TouchSequence } from 'selenium-webdriver';
import * as firebase from 'firebase';
export interface Fav{
  id:string;
  brand: string;
  subBrand: string;
  description: string;
  imageUrl: string;
  price: number;

}

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})

export class FavouritePage implements OnInit {
  favourite: Fav[] =[];
  productId : any[] = [];
  uid : any;
  fav : any;
  loading : any;
  constructor(
    private favouriteSvc: FavouriteService,
    private authSvc : AuthService,
    private db : AngularFirestore,
    private LoadingController: LoadingController
  ) { }

  ngOnInit() {
    this.uid = this.authSvc.userId;
    this.db.collection('Users',ref => ref.where('id','==',this.uid))
    .get()
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(doc =>{
        this.productId = doc.data().favorite;
        for(let i = 0 ; i < this.productId.length ; i++){
          this.db.collection('Products').doc(this.productId[i]).get().toPromise().then(doc =>{
              let dat = {
                id : doc.id,
                brand : doc.data().brand,
                subBrand : doc.data().subBrand,
                description : doc.data().description,
                imageUrl : doc.data().imageUrl,
                price : doc.data().price
              };
              this.favourite.push(dat);
          });
          console.log(this.fav);
        }
      });
    });
    // tslint:disable-next-line: prefer-for-of

    /*this.favouriteSvc.getFavourites().subscribe(res => {
      this.favourite = res;
    });*/
  }

  async remove(item) {
    this.loading = await this.LoadingController.create({
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
          {'favorite' : firebase.firestore.FieldValue.arrayRemove(item.id)}
        );
        this.loading.dismiss();
      })
    });
  }

}
