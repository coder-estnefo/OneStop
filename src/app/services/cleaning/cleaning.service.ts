import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CleaningService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  addCleanersDetails(details) {
    let id = this.firestore.createId();
    const { ownerID ,name, address, favorite, images} = details;
    return this.firestore
      .collection("Cleaning_Services")
      .doc(id)
      .set({
        ownerID,
        id,
        name,
        address,
        favorite,
        images,
      });
  }
}
