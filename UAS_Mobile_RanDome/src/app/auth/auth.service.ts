import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from './user.model';
import { Signup } from './signup.model';
interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refershToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // isAuthenticated = true;
  isAuthenticate = false;
  public userId : any;

  private _user = new BehaviorSubject<User>(null);
  private _signup = new BehaviorSubject<Signup>(null);
  private userCollection :  AngularFirestoreCollection;
  constructor(private http: HttpClient,private db: AngularFirestore) {
    this.userCollection = this.db.collection('Users');
   }

  signup(email: string, password: string, firstname: string, lastname: string, gender: string) {
    //firebase signup API here
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
    {
      email,
      password,
      returnSecureToken: true
    }
    ).pipe(
      tap(userData => {
        const expTime = new Date(new Date().getTime() + (+userData.expiresIn * 1000));
        this._user.next(new User(userData.localId, userData.email, userData.idToken, expTime));
        this._signup.next(new Signup(userData.localId, userData.email, firstname, lastname, gender));
        let user = {
          id:userData.localId,
          email: userData.email,
          favorite : [],
          role: 'user',
          firstname: firstname,
          lastname: lastname,
          gender: gender
        };
        this.userCollection.doc(userData.localId).set(user);
      })
    );
  }
  
  setUser(userId: string) {
    this.userId = userId;
    console.log(this.userId);
    this.isAuthenticate = true;
  }

  getUserID(){
    console.log(this.userId);
    return this.userId;
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`, 
    {
      email,
      password,
      returnSecureToken: true,
      isAuthenticated: true
    }).pipe(
      tap(userData => {
        const expTime = new Date(new Date().getTime() + (+userData.expiresIn * 1000));
        this._user.next(new User(userData.localId, userData.email, userData.idToken, expTime));
      })
    );
    // console.log(this.isAuthenticated);
  }

   get isAuthenticated() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        return !!user.token;
      } else {
        return null;
      }
    }));
   }


  logout() {
    //firebase logout API here
    //this.isAuthenticated = false;
    console.log(this.isAuthenticated);
    this._user.next(null);

  }

  getUser(id) {
    return this.userCollection.doc<Signup>(id).valueChanges();
  }

  updateUser(signup: Signup, id: string){
    return this.userCollection.doc(id).update(signup);
  }

  addUser(signup: Signup){
    return this.userCollection.add(signup);
  }

  removeUser(id){
    return this.userCollection.doc(id).delete();
  }
}
