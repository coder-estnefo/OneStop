import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarWashService {

    constructor(
        // private firestore: Angularthis.firestore
    ) { }

    // Add car wash
    addCarWash(){
        return this.this.firestore.collection('Carwashes').doc().add({

        });
    }

    // Get all car washes
    getCarwashes(){
        // return this.firestore.collection('Carwashes').snapShotChanges();
    }

    // Get car wash by Id
    getCarWashById(carwashId: string){
        // return this.firestore.collection('Carwashes').doc(carwashId);
    }

    // Create a wash slot
    createWashSlot(carwashId: string){
        // return this.firestore.collection('Carwa
        
        // });
    }

    // Search car washes by location
    searchCarWashesByLocation(location: string){
        // return this.firestore.collection('carwashes', ref => ref.where('location', '>=', '0')).snapShotChanges();
    }   
}
