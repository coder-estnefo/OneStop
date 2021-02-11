import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { PropertyService } from 'src/app/services/property/property.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.page.html',
  styleUrls: ['./add-property.page.scss'],
})
export class AddPropertyPage implements OnInit {
  hideDetails = false;
  hideImages = true;

  propertyForm: FormGroup;

  imagesList = [];
  imagesUrls = [];

  isUpload = false;

  constructor(
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private propertyService: PropertyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.propertyForm = this.formBuilder.group({
      province: ['', [Validators.required, Validators.pattern('^[A-Z a-z]+$')]],
      address: [
        '',
        [Validators.required, Validators.pattern('^[A-Z a-z 0-9]+$')],
      ],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      bedrooms: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      bathrooms: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      garages: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      description: [
        '',
        [Validators.required, Validators.pattern('^[A-Z a-z 0-9]+$')],
      ],
      propertyImages: this.formBuilder.array([this.formBuilder.control('')]),
    });
  }

  continue() {
    this.images();
  }

  details() {
    this.hideDetails = false;
    this.hideImages = true;
  }

  images() {
    this.hideDetails = true;
    this.hideImages = false;
  }

  get propertyImages() {
    return this.propertyForm.get('propertyImages') as FormArray;
  }

  addPropertyImage() {
    this.propertyImages.push(this.formBuilder.control(''));
  }

  upload() {
    this.isUpload = true;

    const province = this.propertyForm.value.province;
    const address = this.propertyForm.value.address;
    const price = this.propertyForm.value.price;
    const bedrooms = this.propertyForm.value.bedrooms;
    const bathrooms = this.propertyForm.value.bathrooms;
    const garages = this.propertyForm.value.garages;
    const description = this.propertyForm.value.description;
    const images = this.imagesUrls;

    const details = {
      ownerID: 678290, // needs to get this from auth(waiting for registration)
      province,
      address,
      price,
      bedrooms,
      bathrooms,
      garages,
      description,
      images,
    };

    this.propertyService
      .addProperty(details)
      .then(() => {
        this.isUpload = false;
      })
      .catch(() => {
        this.isUpload = false;
      });

    this.propertyForm.reset();
    this.imagesList = [];
    this.imagesUrls = [];
    this.resetPropertyImages();
    this.details();
    this.router.navigate(['/dashboard']);
  }

  resetPropertyImages() {
    this.propertyImages.clear();
  }

  uploadFile(event) {
    const file = event.target.files[0];
    this.imagesList.push(file);

    const fileName = file.name;
    const fileExt = fileName.split('.').pop();
    const filename = Math.random().toString(36).substring(2) + '.' + fileExt;
    const filePath = 'properties/' + filename;
    const task = this.storage.upload(filePath, file);
    const ref = this.storage.ref(filePath);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe((downloadURL) => {
            this.imagesUrls.push(downloadURL);
          });
        })
      )
      .subscribe();
  }
}
