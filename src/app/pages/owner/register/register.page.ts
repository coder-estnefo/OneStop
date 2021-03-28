import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login/login.service';

import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  app_id = "7d9fb1a3-b3d6-4705-99e4-d0f04e1160b3";


  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    public alertController: AlertController,
    private router: Router,
    private oneSignal: OneSignal
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-z A-Z]+$')]],
      surname: ['', [Validators.required, Validators.pattern('^[a-z A-Z]+$')]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'), //Not 100%
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.initApp();
  }

  register() {
    this.isLoading = true;

    let chatId

		this.oneSignal.getIds().then(id => {
			chatId = id.userId;

      const { name, surname, email, password } = this.registerForm.value;

      this.loginService
        .register(email, password, name, surname, chatId )
        .then(() => {
          this.isLoading = false;
          this.router.navigate(['/navigation'], {

            queryParams: { status: 'success' },
          });
        })
        .catch((error) => {
          this.isLoading = false;
          let code = error.code;
          let errorMessage = error.message;
          this.presentAlert(errorMessage);
        });
		});
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: `${msg} !`,
      buttons: ['OK'],
    });

    await alert.present();
  }

  initApp() {

		this.oneSignal.startInit(this.app_id, '482944391704');
		//send player id to firebase
		this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

		this.oneSignal.handleNotificationReceived().subscribe(data => {

			let msg = data.payload.body;
			let title = data.payload.title;

			alert("received");
		});

		this.oneSignal.handleNotificationOpened().subscribe(data => {
			let msg = data.notification.payload.body
			// alert(msg)
			alert("opened");
		});

		this.oneSignal.endInit();
	}




}
