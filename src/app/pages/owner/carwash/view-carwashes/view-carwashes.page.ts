import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { CarWashService } from 'src/app/services/car-wash/car-wash.service';
import { LoginService } from 'src/app/services/login/login.service';
import { PropertyService } from 'src/app/services/property/property.service';

export interface carwash {
  id: string;
  ownerID: number;
  province: string;
  address: string;
  description: string;
  images: string[];
  popular: boolean;
}

@Component({
  selector: 'app-view-carwashes',
  templateUrl: './view-carwashes.page.html',
  styleUrls: ['./view-carwashes.page.scss'],
})
export class ViewCarwashesPage implements OnInit {

  carwashes = [];
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
    private carwashService: CarWashService
  ) {}

  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      this.carwashService.getOwnerCarwashes(user.uid).subscribe((array) => {
        this.carwashes = array.map((property) => {
          return ({
            id: property.payload.doc.id,
            ...(property.payload.doc.data() as Object),
          } as unknown) as carwash;
        });
      });
    });
  }

  editCarwash(docID) {
    this.router.navigate(['/edit-carwash'], {
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
        <p>Are you sure you want to delete this carwash?</p>
        `,
      buttons: [
        {
          text: 'No',
          handler: () => {},
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteCarwash(docID, images);
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

  deleteCarwash(docID, images) {
    this.presentLoading();
    return this.carwashService
      .deleteCarwash(docID, images)
      .then(() => {
        this.loading.dismiss();
      })
      .catch(() => {
        this.loading.dismiss();
      });
  }

}
