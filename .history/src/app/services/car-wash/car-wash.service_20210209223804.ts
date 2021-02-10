import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarWashService {

    constructor(
        // private firestore: Angularthis.firestore
    ) { }

    // Get all wash slots
    getSlots(carwashId: string){
        // return this.firestore.collection('Carwash/' + carwashId + '/Slot').snapShotChanges();
    }

    // Get wash slots by ID
    getSlotById(carwashId: string, slotId: string){
        // return this.firestore.collection('Carwash/' + carwashId + '/Slot').doc(slotId).snapShotChanges();
    }

    // Get all car washes
    getCarwashes(){
        // return this.firestore.collection('Carwashes').snapShotChanges();
    }

    // Get recommended car washes
    getRecommendedCarWashes(){
        // return this.firestore.collection('carwashes', ref => ref.where('popular', '==', true)).snapShotChanges();
    }
    
    // Get car wash by Id
    getCarWashById(carwashId: string){
        // return this.firestore.collection('Carwashes').doc(carwashId).snapShotChanges();
    }

    // Get car wash owners
    getCarWashOwners(carwashId: string){
        // return this.firestore.collection('Carwashes/' + carwashId + '/Owners).snapShotChanges();
    }

    // Get car wash owner by Id
    getCarWashOwnerById(ownerId: string, carwashId){
        // return this.firestore.collection('Carwashes/' + carwashId + '/Owners').doc(ownerId).snapShotChanges();
    }

    // Search car washes by location
    searchCarWashesByLocation(location: string){
        // return this.firestore.collection('carwashes', ref => ref.where('location', '>=', '0')).snapShotChanges();
    }   

    // Add car wash
    addCarWash(carwash){
        // return this.this.firestore.collection('Carwashes').doc().add({

        // });
    }

    // Create a wash slot
    addSlot(carwashId: string){
        // return this.firestore.collection('Carwash/' + carwashId + '/Slot').doc().add({
        
        // });
    }  

}
