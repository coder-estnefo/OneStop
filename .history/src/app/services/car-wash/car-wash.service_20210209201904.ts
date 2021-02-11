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
        // return firestore.collection('');
    }

    // Get car wash by Id
    getCarWashById(carwashId: string){
        // return firestore.collection('').doc(carwashId);
    }

    // Create a wash slot
    createWashSlot(carwashId: string){
        // return firestore.collection(Carwashes/' + carwashId + '/slot').doc().add({

        // });
    }
}
