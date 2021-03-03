import { property } from './../../pages/owner/property/view-properties/view-properties.page';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

export interface ICarWash{
    id: string;
    name: string;
    images: [];
    location: [];
    popular: boolean;
}

export interface IVehicle{
    id: string;
    make: string;
    model: string;
    color: string;
    registration: string;
}

export interface ISlot{
    date: string,
    start_time: string,
    end_time: string,
    status: string,
    wash_type:string,
    vehicle : IVehicle
}

@Injectable({
  providedIn: 'root'
})
export class CarWashService {

    constructor(
      private storage: AngularFireStorage,
      private firestore: AngularFirestore
    ) { }

    // Get all wash slots
    getSlots(carwashId: string){
        return this.firestore.collection('Carwash/' + carwashId + '/Slot').snapshotChanges();
    }

    // Get wash slots by ID
    getSlotById(carwashId: string, slotId: string){
        return this.firestore.collection('Carwash/' + carwashId + '/Slot').doc(slotId).snapshotChanges();
    }

    // Get all car washes
    getCarwashes(){
        return this.firestore.collection('Carwashes').snapshotChanges();
    }

    // Get recommended car washes
    getRecommendedCarwashes(){
        return this.firestore.collection('Carwashes', ref => ref.where('popular', '==', true)).snapshotChanges();
    }

    // Get car wash by Id
    getCarWashById(carwashId: string){
        return this.firestore.collection('Carwashes').doc(carwashId).snapshotChanges();
    }

    // Get car wash owners
    getCarWashOwners(carwashId: string){
        return this.firestore.collection('Carwashes/' + carwashId + '/Owners').snapshotChanges();
    }

    // Get car wash owner by Id
    getOwnerCarwashes(ownerId: string){
        return this.firestore.collection('Carwashes' , (ref) => ref.where('ownerID', '==', ownerId)).snapshotChanges();
    }

    // Search car washes by location
    searchCarwashesByLocation(location: string){
        return this.firestore.collection('Carwashes', ref => ref.where('location', '>=', '0')).snapshotChanges();
    }

    // Add car wash
    addCarWash(carwash){
        return this.firestore.collection('Carwashes').add({
            name: carwash.name,
            images: carwash.images,
            ownerID: carwash.ownerID,
            location: carwash.location,
            description: carwash.description,
        });
    }

    // Create a wash slot
    addSlot(carwashId: string, slot){
        this.firestore.collection('Carwash/' + carwashId + '/Slot').add({
            date: slot.date,
            start_time: slot.start_time,
            status: slot.status,
            wash_type: slot.wash_type,
            vehicle : {
                model: slot.vehicle.model,
                registration: slot.vehicle.registration,
                color: slot.vehicle.color,
            }
        });
    }

    updateCarwash(carwash) {
      return this.firestore.collection('Carwashes').doc(carwash.docID).update({
        name: carwash.name,
        images: carwash.images,
        ownerID: carwash.ownerID,
        location: carwash.location,
        description: carwash.description,
      });
    }

    //delete property
  deleteCarwash(docID, images) {
    return this.firestore
      .collection('Carwashes')
      .doc(docID)
      .delete()
      .then(() => {
        images.map((img) => {
          this.storage.refFromURL(img).delete();
        });
      });
  }

  //delete a single property image
  deleteCarwashImage(pID, img) {
    return this.firestore
      .collection('Carwashes')
      .doc(pID)
      .update({ images: img })
      .then(() => {
        return this.storage.refFromURL(img).delete();
      });
  }
}
