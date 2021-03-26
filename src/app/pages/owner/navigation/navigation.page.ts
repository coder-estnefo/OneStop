import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CarWashService } from 'src/app/services/car-wash/car-wash.service';
import { CleaningService } from 'src/app/services/cleaning/cleaning.service';
import { LoginService } from 'src/app/services/login/login.service';
import { PropertyService } from 'src/app/services/property/property.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.page.html',
  styleUrls: ['./navigation.page.scss'],
})
export class NavigationPage implements OnInit {
  ownerID;
  status;

  totalProperties = 0;
  totalCarWashes = 0;
  totalCleaningServices = 0;

  constructor(
    private route: ActivatedRoute,
    public alertController: AlertController,
    private router: Router,
    private loginService: LoginService,
    private _propertyService: PropertyService,
    private _carwashService: CarWashService,
    private _cleaningService: CleaningService,
    private auth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      this.ownerID = user.uid;

      this.getTotalProperties(this.ownerID);
      this.getTotalCarwashes(this.ownerID);
      this.getTotalCleaningServices(this.ownerID);
    })

    this.route.queryParams.subscribe((params) => {
      this.status = params.status;
    });

    if (this.status === 'success') {
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: 'Welcome to OneStop :)',
      buttons: [
        {
          text: 'Continue',
          handler: () => {
            this.router.navigate(['/navigation']);
          },
        },
      ],
    });

    await alert.present();
  }

  logout() {
    this.loginService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  gotoProperties(){
    this.router.navigateByUrl('/property-dashboard');
  }

  gotoCarwash(){
    this.router.navigateByUrl('carwash-dashboard');
  }

  gotoCleaningServices(){
    this.router.navigateByUrl('cleaning-dashboard');
  }

  // Get total properties
  getTotalProperties(ownerID){
    this._propertyService.getOwnerProperties(ownerID).subscribe(
      responses => {
        this.totalProperties = responses.length;
      }
    );
  }

  // Get total Carwashes
  getTotalCarwashes(ownerID){
    this._carwashService.getOwnerCarwashes(ownerID).subscribe(
      responses => {
        this.totalCarWashes = responses.length;
      }
    )
  }

  // Get total cleaning services
  getTotalCleaningServices(ownerID){
    this._cleaningService.getOwnerBusinesses(ownerID).subscribe(
      responses => {
        this.totalCleaningServices = responses.length;
      }
    )
  }
}
