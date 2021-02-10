import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

	constructor(
        private firestore: AngularFirestore
	) { }
	

	addproperty(property){
		return this.firestore.collection('Properties').add({});
	}
}
