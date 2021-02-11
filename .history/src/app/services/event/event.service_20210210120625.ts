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
		return this.firestore.collection('Events').add({});
	}
}
