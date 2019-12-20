import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Article {
  title: string;
  description: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articleCollection: AngularFirestoreCollection<Article>;
  private articles: Observable<Article[]>;

  constructor(db: AngularFirestore) {
    this.articleCollection = db.collection<Article>('Articles');

    this.articles = this.articleCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
        });
      })
    );
  }

  getArticles() {
    return this.articles;
  }

  getArticle(id) {
    return this.articleCollection.doc<Article>(id).valueChanges();
  }

  updateArticle(article: Article, id: string){
    return this.articleCollection.doc(id).update(article);
  }

  addArticle(article: Article){
    return this.articleCollection.add(article);
  }

  removeArticle(id){
    return this.articleCollection.doc(id).delete();
  }

}
