import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarWashService {

    constructor(
        // private firestore: AngularFirestore
    ) { }

    // Get all car washes
    getCarwashes(){
        // return firestore.collection('Carwashes').snapShotChanges();
    }

    // Get car wash by Id
    getCarWashById(carwashId: string){
        // return firestore.collection('Carwashes').doc(carwashId);
    }

    // Create a wash slot
    createWashSlot(carwashId: string){
        // return firestore.collection('Carwa
        
        // });
    }

    // Search car washes by location
    searchCarWashesByLocation(location: string){
        // return firestore.collection('carwashes', ref => ref.where('location', '>=', '0')).snapShotChanges();
    }   
}
