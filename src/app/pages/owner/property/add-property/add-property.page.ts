import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login/login.service';
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
    private router: Router,
    private loginService: LoginService
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

    this.loginService.getAuthState();
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
    const ownerID = this.loginService.getUserID();

    const images = this.imagesUrls;

    const {
      province,
      address,
      price,
      bedrooms,
      bathrooms,
      garages,
      description,
    } = this.propertyForm.value;

    const details = {
      ownerID,
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
    this.router.navigate(['/property-dashboard']);
  }

  resetPropertyImages() {
    this.propertyImages.clear();
  }

  uploadFile(event) {
    this.isUpload = true;
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
            this.isUpload = false;
          });
        })
      )
      .subscribe();
  }

  logout() {
    this.loginService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
