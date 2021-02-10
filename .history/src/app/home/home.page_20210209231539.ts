import { Component, OnInit } from '@angular/core';
import { CarWashService } from '../services/car-wash/car-wash.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

    constructor(
		private carwashService: CarWashService
	) {}

	ngOnInit(){
		this.carwashService.getCarwashes().subscribe(responses => {
			console.log(responses);
		})
	}
}
