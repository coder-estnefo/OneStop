import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CleaningService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
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

  getOwnerBusinesses(ownerID) {
    return this.firestore
      .collection('Cleaning_Services', (ref) => ref.where('ownerID', '==', ownerID))
      .snapshotChanges();
  }

  deleteBusiness(docID, images) {
    return this.firestore
      .collection('Cleaning_Services')
      .doc(docID)
      .delete()
      .then(() => {
        images.map((img) => {
          this.storage.refFromURL(img).delete();
        });
      });
  }

  getBusinessById(id: string) {
    return this.firestore
      .collection('Cleaning_Services')
      .doc(id)
      .snapshotChanges();
  }
}
