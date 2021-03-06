import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

export interface ICarWash{
    id: string;
    name: string;
    images: [];
    location: [];
    popular: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CarWashService {

   

    constructor(
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
    getRecommendedCarWashes(){
        return this.firestore.collection('carwashes', ref => ref.where('popular', '==', true)).snapshotChanges();
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
    getCarWashOwnerById(ownerId: string, carwashId){
        return this.firestore.collection('Carwashes/' + carwashId + '/Owners').doc(ownerId).snapshotChanges();
    }

    // Search car washes by location
    searchCarWashesByLocation(location: string){
        return this.firestore.collection('carwashes', ref => ref.where('location', '>=', '0')).snapshotChanges();
    }   

    // Add car wash
    addCarWash(carwash: ICarWash){
        return this.firestore.collection('Carwashes').add({
            
        });
    }

    // Create a wash slot
    addSlot(carwashId: string){
        return this.firestore.collection('Carwash/' + carwashId + '/Slot').add({
        
        });
    }  

}
