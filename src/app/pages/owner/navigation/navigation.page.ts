import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.page.html',
  styleUrls: ['./navigation.page.scss'],
})
export class NavigationPage implements OnInit {
  status;

  constructor(
    private route: ActivatedRoute,
    public alertController: AlertController,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
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
}
