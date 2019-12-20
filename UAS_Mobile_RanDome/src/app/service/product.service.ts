import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product {
  brand: string;
  subBrand: string;
  description: string;
  imageUrl: string;
  price: number;
  // rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsCollection: AngularFirestoreCollection<Product>;
  private products: Observable<Product[]>;

  constructor(db: AngularFirestore) {
    this.productsCollection = db.collection<Product>('Products');

    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
        });
      })
    );
  }

  getProducts(){
    return this.products;
  }

  getProduct(id){
    return this.productsCollection.doc<Product>(id).valueChanges();
  }

  updateProduct(product: Product, id: string){
    return this.productsCollection.doc(id).update(product);
  }

  addProduct(product: Product){
    return this.productsCollection.add(product);
  }

  removeProduct(id: string) {
    console.log(id);
    return this.productsCollection.doc(id).delete();
    
  }
}
