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
        // return firestore.collection('Services/Carwash');
    }

    // Get car wash by Id
    getCarWashById(carwashId: string){
        // return firestore.collection('Services/Carwash').doc(carwashId);
    }
}
