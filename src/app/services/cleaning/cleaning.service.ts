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

  updateCleanersDetails(details) {
    const { ownerID ,name, address, images, id} = details;
    return this.firestore
      .collection("Cleaning_Services")
      .doc(id)
      .set({
        ownerID,
        id,
        name,
        address,
        images,
      });
  }

  deleteBusinessImage(bID, img) {
    return this.firestore
      .collection('Cleaning_Services')
      .doc(bID)
      .update({ images: img })
      .then(() => {
        return this.storage.refFromURL(img).delete();
      });
  }

  addService(details) {
    const { 
      businessID, 
      ownerID,
      service,
      price,
      description,
      images
    }  = details;

    let serviceID = this.firestore.createId();

    return this.firestore
      .collection('Cleaning_Services')
      .doc(businessID)
      .collection('types_of_services')
      .doc(serviceID)
      .set({
        businessID,
        ownerID,
        service,
        price,
        description,
        serviceID,
        images
      });
  }

  getOwnerServices(userID, docID) {
    return this.firestore
      .collection('Cleaning_Services')
      .doc(docID)
      .collection('types_of_services', ref => ref.where('ownerID','==',userID))
      .snapshotChanges();
  }

  setViewingDates(ownerID, days) {
    return this.firestore
      .collection('Owner')
      .doc(ownerID)
      .collection('Cleaning_Dates')
      .doc(ownerID)
      .set({
        days
      });
  }

  getViewingDates(ownerID) {
    return this.firestore
      .collection('Owner')
      .doc(ownerID)
      .collection('Cleaning_Dates')
      .doc(ownerID)
      .snapshotChanges();
  }

  updateDates(ownerID, days) {
    return this.firestore
     .collection('Owner')
      .doc(ownerID)
      .collection('Cleaning_Dates')
      .doc(ownerID)
      .update({
        days
      })
  }

  setChatID(uid1, uid2) {
    if (uid1 < uid2) {
      return uid1 + uid2;
    } else {
      return uid2 + uid1;
    }
  }

  startChat(chat) {
    const { 
      id, 
      message, 
      from, 
      to, 
      time, 
      date, 
      cleaningName, 
      requestDate, 
      requestType, 
      serviceRequest 
    } = chat;
    const chatID = this.setChatID(from, to) + id;
    return this.firestore
      .collection('chats')
      .doc(from)
      .collection('messages')
      .add({
        id,
        message,
        from,
        to,
        time,
        date,
        chatID,
        cleaningName,
        requestDate,
        requestType,
        serviceRequest
      })
      .then(() => {
        return this.firestore
          .collection('chats')
          .doc(to)
          .collection('messages')
          .add({
            id,
            message,
            from,
            to,
            time,
            date,
            chatID,
            cleaningName,
            requestDate,
            requestType,
            serviceRequest
          });
      });
  }

  getChats(userID) {
    return this.firestore
      .collection('chats')
      .doc(userID)
      .collection('messages', ref => ref.where('requestType','==','cleaning'))
      .snapshotChanges();
  }
}
