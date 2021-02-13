import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginservice: LoginService,
    private router: Router,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), //Not 100%
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    this.isLoading = true;
    const { email, password } = this.loginForm.value;
    this.loginservice
      .login(email, password)
      .then(() => {
        this.isLoading = false;
        this.router.navigate(['/navigation'], {
          queryParams: { status: 'success' },
        });
      })
      .catch((error) => {
        this.isLoading = false;
        let errorMessage = error.message;
        this.presentAlert(errorMessage);
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
}
