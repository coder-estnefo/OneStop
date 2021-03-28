import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  state;

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private oneSignal: OneSignal
  ) {}

  register(email, password, name, surname,chatId) {
    return this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((results) => {
        this.getAuthState();
        let userID = results.user.uid;
        return this.firestore.collection('Owner').doc(userID).set({
          userID,
          name,
          surname,
          playerID: chatId,
          role: 'owner',
          email
        });
      });
  }

  login(email, password) {
    return this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.getAuthState();
      });
  }

  getAuthState() {
    this.fireAuth.authState.subscribe((state) => {
      this.state = state;
    });
  }

  getUserID() {
    return this.state.uid;
  }

  logout() {
    return this.fireAuth.signOut().then(() => {
      this.oneSignal.removeExternalUserId();
    })
  }
}
