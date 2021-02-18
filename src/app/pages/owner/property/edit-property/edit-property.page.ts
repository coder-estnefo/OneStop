import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login/login.service';
import { PropertyService } from 'src/app/services/property/property.service';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.page.html',
  styleUrls: ['./edit-property.page.scss'],
})
export class EditPropertyPage implements OnInit {
  hideDetails = false;
  hideImages = true;

  propertyForm: FormGroup;

  imagesList = [];
  imagesUrls = [];

  isUpload = false;

  currentProperty;
  currentImages = [];
  propertyDocID;

  imageUpload = false;

  loading;

  constructor(
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private propertyService: PropertyService,
    private router: Router,
    private loginService: LoginService,
    private auth: AngularFireAuth,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loginService.getAuthState();

    this.route.queryParams.subscribe((params) => {
      this.propertyDocID = params.docID;
      this.propertyService
        .getPropertyById(this.propertyDocID)
        .subscribe((prop) => {
          this.currentProperty = {
            id: prop.payload.id,
            ...(prop.payload.data() as Object),
          };
          this.currentImages = this.currentProperty.images;
          this.imagesUrls = this.currentProperty.images;

          const {
            province,
            address,
            price,
            bedrooms,
            bathrooms,
            garages,
            description,
          } = this.currentProperty;

          this.propertyForm = this.formBuilder.group({
            province: [
              province,
              [Validators.required, Validators.pattern('^[A-Z a-z]+$')],
            ],
            address: [
              address,
              [Validators.required, Validators.pattern('^[A-Z a-z 0-9]+$')],
            ],
            price: [
              price,
              [Validators.required, Validators.pattern('^[0-9]+$')],
            ],
            bedrooms: [
              bedrooms,
              [Validators.required, Validators.pattern('^[0-9]+$')],
            ],
            bathrooms: [
              bathrooms,
              [Validators.required, Validators.pattern('^[0-9]+$')],
            ],
            garages: [
              garages,
              [Validators.required, Validators.pattern('^[0-9]+$')],
            ],
            description: [
              description,
              [Validators.required, Validators.pattern('^[A-Z a-z 0-9]+$')],
            ],
            propertyImages: this.formBuilder.array([
              this.formBuilder.control(''),
            ]),
          });
        });
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

  update() {
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

    const { availability_status, popular, propertyID } = this.currentProperty;

    const details = {
      docID: this.propertyDocID,
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
    };

    this.propertyService
      .updateProperty(details)
      .then(() => {
        this.isUpload = false;
      })
      .catch(() => {
        this.isUpload = false;
      });

    this.details();
    this.router.navigate(['/view-properties']);

    this.currentProperty = {};
  }

  resetPropertyImages() {
    this.propertyImages.clear();
  }

  uploadFile(event) {
    this.imageUpload = true;
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
            this.imageUpload = false;
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

  deleteImage(img) {
    this.presentLoading();
    let images = this.currentImages.filter((currentImg) => currentImg !== img);
    this.propertyService
      .deletePropertyImage(this.propertyDocID, images)
      .then(() => {
        this.loading.dismiss();
      })
      .catch(() => {
        this.loading.dismiss();
      });
  }

  async presentDeleteAlert(img) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class alert-wrapper',
      message: `
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this Image?</p>
        `,
      buttons: [
        {
          text: 'No',
          handler: () => {},
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteImage(img);
          },
        },
      ],
    });

    await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class loading-wrapper',
      message: 'Please wait...',
    });
    await this.loading.present();
  }
}
