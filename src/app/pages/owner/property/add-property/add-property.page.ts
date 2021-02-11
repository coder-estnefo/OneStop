import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

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

  constructor(
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage
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
    console.log(this.propertyForm);

    console.log(this.imagesUrls);
  }

  reset() {
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
