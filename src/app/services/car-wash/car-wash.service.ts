import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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
    getCarWashOwnerById(ownerId: string, carwashId){
        return this.firestore.collection('Carwashes/' + carwashId + '/Owners').doc(ownerId).snapshotChanges();
    }

    // Search car washes by location
    searchCarwashesByLocation(location: string){
        return this.firestore.collection('Carwashes', ref => ref.where('location', '>=', '0')).snapshotChanges();
    }   

    // Add car wash
    addCarWash(carwash){
        this.firestore.collection('Carwashes').add({
            name: carwash.name,
            image: carwash.images,
            location: carwash.location,
            popular: carwash.popular,
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
}
