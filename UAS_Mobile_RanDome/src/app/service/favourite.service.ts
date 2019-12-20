import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Favourite {
  favId?: string;
  brand: string;
  subBrand: string;
  description: string;
  imageUrl: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})

export class FavouriteService {
  private favouriteCollection: AngularFirestoreCollection<Favourite>;
  private favourites: Observable<Favourite[]>;

  constructor(db: AngularFirestore) {
    this.favouriteCollection = db.collection<Favourite>('Favourites');

    this.favourites = this.favouriteCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
        });
      })
    );
  }

  getFavourites(){
    return this.favourites;
  }

  getFavourite(id){
    return this.favouriteCollection.doc<Favourite>(id).valueChanges();
  }

  updateFavourite(favourite: Favourite, id: string){
    return this.favouriteCollection.doc(id).update(favourite);
  }

  addFavourite(favourite: Favourite, id: string){
    return this.favouriteCollection.doc(id).set(favourite);
  }

  removeFavourite(id: string) {
    console.log(id);
    return this.favouriteCollection.doc(id).delete();
  }
}