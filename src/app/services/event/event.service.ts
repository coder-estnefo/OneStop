import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EventService {

	constructor(
        private firestore: AngularFirestore
	) { }
	
	// Add an event
	addEvent(){
		// return this.firestore.collection('Events').add({});
	}

	// Get event by Id
	getEventById(eventId: string){
		// return this.firestore.collection('Events').doc(eventId).snapshotChanges();
	}

	// Add property Owner
	addEventOwner(propertyId: string){
		// return this.firestore.collection('Properties/' + propertyId + '/Owners').add({});
	}

	// Get property owners
	getEventOwners(propertyId: string){
		// return this.firestore.collection('Properties/' + propertyId + '/Owners').snapshotChanges();
	}
}
