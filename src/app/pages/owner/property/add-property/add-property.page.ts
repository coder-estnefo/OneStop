import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.page.html',
  styleUrls: ['./add-property.page.scss'],
})
export class AddPropertyPage implements OnInit {
	showDetails = true;
	showImages = false;

	propertyForm: FormGroup;

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.propertyForm = this.formBuilder.group({
			province: ['', [
				Validators.required,
				Validators.pattern('^[A-Z a-z 0-9]+$')
			]],
			address: ['', [
				Validators.required,
				Validators.pattern('^[A-Z a-z 0-9]+$')
			]],
			price: ['', [
				Validators.required,
				Validators.pattern('^[0-9]+$')
			]],
			bedrooms: ['', [
				Validators.required,
				Validators.pattern('^[0-9]+$')
			]],
			bathrooms: ['', [
				Validators.required,
				Validators.pattern('^[0-9]+$')
			]],
			garages: ['', [
				Validators.required,
				Validators.pattern('^[0-9]+$')
			]],
			description: ['', [
				Validators.required,
				Validators.pattern('^[A-Z a-z 0-9]+$')
			]],
		})
	}

	continue() {
		this.images();
	}

	details() {
		this.showDetails = true;
		this.showImages = false;
	}

	images() {
		this.showDetails = false;
		this.showImages = true;
	}
}
