import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CleaningService } from 'src/app/services/cleaning/cleaning.service';
import { LoginService } from 'src/app/services/login/login.service';
import firebase from 'firebase/app';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-edit-business',
  templateUrl: './edit-business.page.html',
  styleUrls: ['./edit-business.page.scss'],
})
export class EditBusinessPage implements OnInit {

  hideDetails = false;
  hideImages = true;

  cleanersForm: FormGroup;
  isUpload = false;
  imagesList = [];
  imagesUrls = [];

  businessID;
  currentBusiness;
  currentImages = [];
  imageUpload = false;
  loading;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private cleaningService: CleaningService,
    private route: ActivatedRoute,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {

    this.loginService.getAuthState();

    this.route.queryParams.subscribe((params) => {
      this.businessID = params.docID;
      this.cleaningService
        .getBusinessById(this.businessID)
        .subscribe((prop) => {
          this.currentBusiness = {
            id: prop.payload.id,
            ...(prop.payload.data() as Object),
          };
          this.currentImages = this.currentBusiness.images;
          this.imagesUrls = this.currentBusiness.images;

          const {
            name,
            address
          } = this.currentBusiness;

          this.cleanersForm = this.formBuilder.group({
            name: [ name , [Validators.required, Validators.pattern('^[A-Z a-z]+$')]],
            address: this.formBuilder.array([
              [ address[0], [Validators.required, Validators.pattern('^[0-9 A-Z a-z]+$')]],
              [ address[1], [Validators.required, Validators.pattern('^[A-Z a-z]+$')]],
              [ address[2], [Validators.required, Validators.pattern('^[A-Z a-z -]+$')]],
              [ address[3], [Validators.required, Validators.pattern('^[0-9]+$')]],
            ]),
            cleanersImages: this.formBuilder.array([this.formBuilder.control('')]),
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

  get cleanersImages() {
    return this.cleanersForm.get('cleanersImages') as FormArray;
  }

  addCleanersImage() {
    this.cleanersImages.push(this.formBuilder.control(''));
  }

  resetCleanersImages() {
    this.cleanersImages.clear();
  }

  upload() {
    this.isUpload = true;
    const ownerID = firebase.auth().currentUser.uid;

    const images = this.imagesUrls;

    const {
      name,
      address,
    } = this.cleanersForm.value;

    const details = {
      ownerID,
      name,
      address,
      images,
      id: this.businessID,
    };

    this.cleaningService
      .updateCleanersDetails(details)
      .then(() => {
        this.isUpload = false;
      })
      .catch(() => {
        this.isUpload = false;
      });

    this.cleanersForm.reset();
    this.imagesList = [];
    this.imagesUrls = [];
    this.router.navigate(['/cleaning-dashboard']);
  }

  uploadFile(event) {
    this.isUpload = true;
    const file = event.target.files[0];
    this.imagesList.push(file);

    const fileName = file.name;
    const fileExt = fileName.split('.').pop();
    const filename = Math.random().toString(36).substring(2) + '.' + fileExt;
    const filePath = 'cleaners/' + filename;
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

  deleteImage(img) {
    this.presentLoading();
    let images = this.currentImages.filter((currentImg) => currentImg !== img);
    this.cleaningService
      .deleteBusinessImage(this.businessID, images)
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

  logout() {
    this.loginService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
