import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    public alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-z A-Z]+$')]],
      surname: ['', [Validators.required, Validators.pattern('^[a-z A-Z]+$')]],
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

  register() {
    this.isLoading = true;
    const { name, surname, email, password } = this.registerForm.value;

    this.loginService
      .register(email, password, name, surname)
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
