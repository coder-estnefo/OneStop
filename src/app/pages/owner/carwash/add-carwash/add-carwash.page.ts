import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CarWashService } from 'src/app/services/car-wash/car-wash.service';
import { LoginService } from 'src/app/services/login/login.service';
import { PropertyService } from 'src/app/services/property/property.service';

@Component({
  selector: 'app-add-carwash',
  templateUrl: './add-carwash.page.html',
  styleUrls: ['./add-carwash.page.scss'],
})
export class AddCarwashPage implements OnInit {

  hideDetails = false;
  hideImages = true;

  carwashForm: FormGroup;

  imagesList = [];
  imagesUrls = [];

  isUpload = false;

  constructor(
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private carwashService: CarWashService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.carwashForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Z a-z]+$')]],
      location: this.formBuilder.array([
        ['', [Validators.required, Validators.pattern('^[0-9 A-Z a-z]+$')]],
        ['', [Validators.required, Validators.pattern('^[A-Z a-z]+$')]],
        ['', [Validators.required, Validators.pattern('^[A-Z a-z]+$')]],
        ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      ]),
      description: [
        '',
        [Validators.required, Validators.pattern('^[A-Z a-z 0-9 ,. \r\n]+$')],
      ],
      carwashImages: this.formBuilder.array([this.formBuilder.control('')]),
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

  get carwashImages() {
    return this.carwashForm.get('carwashImages') as FormArray;
  }

  addCarwashImage() {
    this.carwashImages.push(this.formBuilder.control(''));
  }

  upload() {
    this.isUpload = true;
    const ownerID = this.loginService.getUserID();

    const images = this.imagesUrls;

    const {
      location,
      description,
      name,
    } = this.carwashForm.value;

    const details = {
      ownerID,
      location,
      description,
      images,
      name,
      availability_status: true,
      favorite: false,
    };

    this.carwashService
      .addCarWash(details)
      .then(() => {
        this.isUpload = false;
      })
      .catch(() => {
        this.isUpload = false;
      });

    this.carwashForm.reset();
    this.imagesList = [];
    this.imagesUrls = [];
    this.resetCarwashImages();
    this.details();
    this.router.navigate(['/carwash-dashboard']);
  }

  resetCarwashImages() {
    this.carwashImages.clear();
  }

  uploadFile(event) {
    this.isUpload = true;
    const file = event.target.files[0];
    this.imagesList.push(file);
    const fileName = file.name;
    const fileExt = fileName.split('.').pop();
    const filename = Math.random().toString(36).substring(2) + '.' + fileExt;
    const filePath = 'carwash/' + filename;
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
