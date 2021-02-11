import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

	constructor(
        private firestore: AngularFirestore
	) { }

	// Get properties
	getProperties(){
		// return this.firestore.collection('Properties').snapshotChanges();
	}
	
	// Get property by Id
	getPropertyById(propertyId: string){
		// return this.firestore.collection('Properties').doc(propertyId).snapshotChanges();
	}

	// Get property owners
	getPropertyOwners(propertyId: string){
		// return this.firestore.collection(`Properties/${{propertyId}}/Owners`).snapshotChanges();
	}

	// Add an appointment
	addAppointment(propertyId: string, appointment){
		// return this.firestore.collection(`Properties/${{propertyId}}/Appointments`).add(appointment);
	}

	// Get appointments
	getAppointments(propertyId: string){
		// return this.firestore.collection(`Properties/${{propertyId}}/Appointments`).snapshotChanges();
	}
   
	// Add property
	addProperty(property){
		return this.firestore.collection('Properties').add({
			// name: '',
			location: [property.province, property.address],
			image: ['', ''],
		 	price: 0.0,
			garages: 0,
			bedrooms: 0,
			description: '',
			// availability_status: '',
			popular: true
		});
	}

	// Add property Owner
	addPropertyOwner(propertyId: string){
		// return this.firestore.collection(`Properties/${{propertyId}}/Owners`).add({
		// 	name: '',
		// });
	}

	
}
