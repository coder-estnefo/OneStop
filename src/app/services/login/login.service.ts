import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  state;

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  register(email, password, name, surname) {
    return this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((results) => {
        this.getAuthState();
        let userID = results.user.uid;
        return this.firestore.collection('Owner').add({
          userID,
          name,
          surname,
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
}
