import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

	constructor(
        private firestore: AngularFirestore
	) { }
	

	// Add property
	addProperty(property){
		return this.firestore.collection('Properties').add({});
	}

	// Get property by Id
	getPropertyById(propertyId: string){
		return this.firestore.collection('Properties').doc(propertyId).snapshotChanges();
	}
}
