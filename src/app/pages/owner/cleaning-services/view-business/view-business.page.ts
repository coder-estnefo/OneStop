import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { CleaningService } from 'src/app/services/cleaning/cleaning.service';
import { LoginService } from 'src/app/services/login/login.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-view-business',
  templateUrl: './view-business.page.html',
  styleUrls: ['./view-business.page.scss'],
})
export class ViewBusinessPage implements OnInit {

  businesses = [];
  loading;

  constructor(
    private loginService: LoginService,
    private router: Router,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private cleaningService: CleaningService,
    private auth: AngularFireAuth
    
  ) { }

  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      this.cleaningService.getOwnerBusinesses(user.uid).subscribe((response) => {
        this.businesses = response.map((business) => {
          return ({
            ...business.payload.doc.data() as Object
          })
        })
        console.log(user.uid);
        console.log(this.businesses);
      })
    })
  }

  editBusiness(id) {
    this.router.navigate(['/edit-business'], {
      queryParams: { docID: id },
    });
  }

  async presentDeleteAlert(id, images) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class alert-wrapper',
      message: `
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this cleaning business?</p>
        `,
      buttons: [
        {
          text: 'No',
          handler: () => {},
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteBusiness(id, images);
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

  deleteBusiness(id, images) {
    this.presentLoading();
    return this.cleaningService
      .deleteBusiness(id, images)
      .then(() => {
        this.loading.dismiss();
      })
      .catch(() => {
        this.loading.dismiss();
      });
  }

  logout() {
    this.loginService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  toServices(id, userID) {
    this.router.navigate(['view-cleaning-services'], {
      queryParams: {id, userID}
    })
  }

  toAddService(id, userID) {
    this.router.navigate(['add-service'], {
      queryParams: {id, userID}
    })
  }

  toDays() {
    this.router.navigate(['cleaning-days']);
  }

  toChats() {
    this.router.navigate(['cleaning-chats']);
  }
}
