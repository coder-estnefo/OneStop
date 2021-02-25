import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  // Get properties
  getProperties() {
    // return this.firestore.collection('Properties').snapshotChanges();
  }

  // Get property by Id
  getPropertyById(propertyId: string) {
    return this.firestore
      .collection('Properties')
      .doc(propertyId)
      .snapshotChanges();
  }

  // Get property owners
  getPropertyOwners(propertyId: string) {
    // return this.firestore.collection(`Properties/${{propertyId}}/Owners`).snapshotChanges();
  }

  // Add an appointment
  addAppointment(propertyId: string, appointment) {
    // return this.firestore.collection(`Properties/${{propertyId}}/Appointments`).add(appointment);
  }

  // Get appointments
  getAppointments(propertyId: string) {
    return this.firestore
      .collection(`Properties/${{ propertyId }}/Appointments/`)
      .snapshotChanges();
  }

  // Add property
  addProperty(property) {
    const {
      ownerID,
      province,
      address,
      price,
      bedrooms,
      bathrooms,
      garages,
      description,
      images,
    } = property;

    return this.firestore.collection('Properties').add({
      ownerID,
      province,
      address,
      price,
      bedrooms,
      bathrooms,
      garages,
      description,
      images,
      availability_status: '',
      popular: true,
      propertyID: new Date().getTime().toString() + ownerID.substring(5, 10),
    });
  }

  // Add property Owner
  addPropertyOwner(propertyId: string) {
    // return this.firestore.collection(`Properties/${{propertyId}}/Owners`).add({
    // 	name: '',
    // });
  }

  // Get Owner Properties
  getOwnerProperties(ownerID) {
    return this.firestore
      .collection('Properties', (ref) => ref.where('ownerID', '==', ownerID))
      .snapshotChanges();
  }

  // Update property
  updateProperty(property) {
    const {
      docID,
      ownerID,
      province,
      address,
      price,
      bedrooms,
      bathrooms,
      garages,
      description,
      images,
      availability_status,
      popular,
      propertyID,
    } = property;

    return this.firestore.collection('Properties').doc(docID).set({
      ownerID,
      province,
      address,
      price,
      bedrooms,
      bathrooms,
      garages,
      description,
      images,
      availability_status,
      popular,
      propertyID,
    });
  }

  //delete property
  deleteProperty(docID, images) {
    return this.firestore
      .collection('Properties')
      .doc(docID)
      .delete()
      .then(() => {
        images.map((img) => {
          this.storage.refFromURL(img).delete();
        });
      });
  }

  //delete a single property image
  deletePropertyImage(pID, img) {
    return this.firestore
      .collection('Properties')
      .doc(pID)
      .update({ images: img })
      .then(() => {
        return this.storage.refFromURL(img).delete();
      });
  }

  // //Chat
  // startChat(chat) {
  //   const { id, message, from, to, time, date } = chat;

  //   return this.firestore.collection('chats').add({
  //     id,
  //     message,
  //     from,
  //     to,
  //     time,
  //     date,
  //   });
  // }

  // //get chats
  // getChats(userID) {
  //   return this.firestore.collection('chats').snapshotChanges();
  // }

  setChatID(uid1, uid2) {
    if (uid1 < uid2) {
      return uid1 + uid2;
    } else {
      return uid2 + uid1;
    }
  }

  //Chat
  startChat(chat) {
    const { id, message, from, to, time, date } = chat;
    const chatID = this.setChatID(from, to);
    return this.firestore.collection('chats').doc(from).collection('messages').add({
      id,
      message,
      from,
      to,
      time,
      date,
    }).then(()=> {
      return this.firestore.collection('chats').doc(to).collection('messages').add({
        id,
        message,
        from,
        to,
        time,
        date,
      })
    })
  }

  //get chats
  getChats(userID) {
    return this.firestore.collection('chats').doc(userID).collection('messages').snapshotChanges();
  }
}
