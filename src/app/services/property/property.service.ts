import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private firestore: AngularFirestore) {}

  // Get properties
  getProperties() {
    // return this.firestore.collection('Properties').snapshotChanges();
  }

  // Get property by Id
  getPropertyById(propertyId: string) {
    return this.firestore
      .collection('Properties')
      .doc(propertyId)
      .snapshotChanges();
  }

  // Get property owners
  getPropertyOwners(propertyId: string) {
    // return this.firestore.collection(`Properties/${{propertyId}}/Owners`).snapshotChanges();
  }

  // Add an appointment
  addAppointment(propertyId: string, appointment) {
    // return this.firestore.collection(`Properties/${{propertyId}}/Appointments`).add(appointment);
  }

  // Get appointments
  getAppointments(propertyId: string) {
    // return this.firestore.collection(`Properties/${{propertyId}}/Appointments`).snapshotChanges();
  }

  // Add property
  addProperty(property) {
    const {
      ownerID,
      province,
      address,
      price,
      bedrooms,
      bathrooms,
      garages,
      description,
      images,
    } = property;

    return this.firestore.collection('Properties').add({
      ownerID,
      province,
      address,
      price,
      bedrooms,
      bathrooms,
      garages,
      description,
      images,
      availability_status: '',
      popular: true,
      propertyID: new Date().getTime().toString() + ownerID.substring(5, 10),
    });
  }

  // Add property Owner
  addPropertyOwner(propertyId: string) {
    // return this.firestore.collection(`Properties/${{propertyId}}/Owners`).add({
    // 	name: '',
    // });
  }

  // Get Owner Properties
  getOwnerProperties(ownerID) {
    return this.firestore
      .collection('Properties', (ref) => ref.where('ownerID', '==', ownerID))
      .snapshotChanges();
  }

  // Update property
  updateProperty(property) {
    const {
      docID,
      ownerID,
      province,
      address,
      price,
      bedrooms,
      bathrooms,
      garages,
      description,
      images,
      availability_status,
      popular,
      propertyID,
    } = property;

    return this.firestore.collection('Properties').doc(docID).set({
      ownerID,
      province,
      address,
      price,
      bedrooms,
      bathrooms,
      garages,
      description,
      images,
      availability_status,
      popular,
      propertyID,
    });
  }
}
