import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login/login.service';
import { PropertyService } from 'src/app/services/property/property.service';

export interface property {
  ownerID: number;
  province: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  garages: number;
  description: string;
  images: string[];
  availability_status: string;
  popular: boolean;
  propertyID: string;
  docID: string;
}

@Component({
  selector: 'app-view-properties',
  templateUrl: './view-properties.page.html',
  styleUrls: ['./view-properties.page.scss'],
})
export class ViewPropertiesPage implements OnInit {
  properties = [];
  loading;

  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  constructor(
    private propertyService: PropertyService,
    private auth: AngularFireAuth,
    private router: Router,
    private loginService: LoginService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      this.propertyService.getOwnerProperties(user.uid).subscribe((array) => {
        this.properties = array.map((property) => {
          return ({
            docID: property.payload.doc.id,
            ...(property.payload.doc.data() as Object),
          } as unknown) as property;
        });
      });
    });
  }

  editProperty(docID) {
    this.router.navigate(['/edit-property'], {
      queryParams: { docID: docID },
    });
  }

  logout() {
    this.loginService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  async presentDeleteAlert(docID, images) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class alert-wrapper',
      message: `
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this property?</p>
        `,
      buttons: [
        {
          text: 'No',
          handler: () => {},
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteProperty(docID, images);
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

  deleteProperty(docID, images) {
    this.presentLoading();
    return this.propertyService
      .deleteProperty(docID, images)
      .then(() => {
        this.loading.dismiss();
      })
      .catch(() => {
        this.loading.dismiss();
      });
  }

  switchVisibility(docID, status) {
    let visibility = !status;
    return this.propertyService
      .changeVisibility(docID, visibility)
      .then(()=> {
        this.presentToast();
      })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Visibility Changed',
      duration: 2000
    });
    toast.present();
  }
  
}
