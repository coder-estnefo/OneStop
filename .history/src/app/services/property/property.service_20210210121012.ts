import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

	constructor(
        private firestore: AngularFirestore
	) { }
	
	// Get property by Id
	getPropertyById(propertyId: string){
		// return this.firestore.collection('Properties').doc(propertyId).snapshotChanges();
	}
   
	// Add property
	addProperty(property){
		// return this.firestore.collection('Properties').add({});
	}

	// Add property Owner
	addPropertyOwner(propertyId: string){
		// return this.firestore.collection('Properties/' + propertyId + '/Owners').add({});
	}

	// Get property owners
	getPropertyOwners(propertyId: string){
		return this.firestore.collection('Properties/' + propertyId + '/Owners').snapshotChanges();
	}
}
