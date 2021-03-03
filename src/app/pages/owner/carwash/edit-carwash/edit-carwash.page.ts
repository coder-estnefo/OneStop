import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { CarWashService } from 'src/app/services/car-wash/car-wash.service';
import { LoginService } from 'src/app/services/login/login.service';
import { PropertyService } from 'src/app/services/property/property.service';

@Component({
  selector: 'app-edit-carwash',
  templateUrl: './edit-carwash.page.html',
  styleUrls: ['./edit-carwash.page.scss'],
})
export class EditCarwashPage implements OnInit {

  hideDetails = false;
  hideImages = true;

  carwashForm: FormGroup;

  imagesList = [];
  imagesUrls = [];

  isUpload = false;

  currentCarwash;
  currentImages = [];
  carwashDocID;

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
    private alertController: AlertController,
    private carwashService: CarWashService
  ) {}

  ngOnInit() {
    this.loginService.getAuthState();

    this.route.queryParams.subscribe((params) => {
      this.carwashDocID = params.docID;
      this.carwashService
        .getCarWashById(this.carwashDocID)
        .subscribe((prop) => {
          this.currentCarwash = {
            id: prop.payload.id,
            ...(prop.payload.data() as Object),
          };
          this.currentImages = this.currentCarwash.images;
          this.imagesUrls = this.currentCarwash.images;

          const {
            name,
            location,
            description,
          } = this.currentCarwash;

          this.carwashForm = this.formBuilder.group({
            name: [
              name, [Validators.required, Validators.pattern('^[A-Z a-z]+$')]
            ],
            location: this.formBuilder.array([
              [
                location[0],
                [Validators.required, Validators.pattern('^[0-9 A-Z a-z]+$')]
              ],
              [
                location[1],
                [Validators.required, Validators.pattern('^[A-Z a-z]+$')]
              ],
              [
                location[2],
                [Validators.required, Validators.pattern('^[A-Z a-z]+$')]
              ],
              [
                location[3],
                [Validators.required, Validators.pattern('^[0-9]+$')]
              ],
            ]),
            description: [
              description,
              [Validators.required, Validators.pattern('^[A-Z a-z 0-9 ,. \r\n]+$')],
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
    return this.carwashForm.get('propertyImages') as FormArray;
  }

  addPropertyImage() {
    this.propertyImages.push(this.formBuilder.control(''));
  }

  update() {
    this.isUpload = true;
    const ownerID = this.loginService.getUserID();

    const images = this.imagesUrls;

    const {
      location,
      description,
      name,
    } = this.carwashForm.value;

    const { availability_status, favorite, propertyID } = this.currentCarwash;

    const details = {
      docID: this.carwashDocID,
      ownerID,
      location,
      description,
      images,
      name,
    };

    this.carwashService
      .updateCarwash(details)
      .then(() => {
        this.isUpload = false;
      })
      .catch(() => {
        this.isUpload = false;
      });

    this.details();
    this.router.navigate(['/view-carwashes']);

    this.currentCarwash = {};
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
      .deletePropertyImage(this.carwashDocID, images)
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
