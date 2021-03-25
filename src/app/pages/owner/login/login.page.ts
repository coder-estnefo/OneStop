import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AlertController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login/login.service';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  userInfor=[]

  constructor(
    private formBuilder: FormBuilder,
    private loginservice: LoginService,
    private router: Router,
    public alertController: AlertController,
    private oneSignal: OneSignal,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'), //Not 100%
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

       let userID = firebase.auth().currentUser.uid;



				this.firestore.collection("Owner").get().subscribe(response => {

					response.forEach(fireData => {
						let id = fireData.id;
						console.log(id)
						this.userInfor.push(id)

					})



					var existItem = this.userInfor.find(x => x == userID);

					console.log(userID + "  " + existItem)

					if (existItem) {

						this.router.navigate(['/navigation']);
					} else {
						this.presentAlert('This email cannot be used for this Account');
            this.isLoading = false;
						this.loginservice.logout();
					}
				})



        this.oneSignal.startInit('7d9fb1a3-b3d6-4705-99e4-d0f04e1160b3', '482944391704');

        this.oneSignal.setExternalUserId(userID);

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

        this.oneSignal.handleNotificationReceived().subscribe(() => {
          alert('notification received')
        });

        this.oneSignal.handleNotificationOpened().subscribe(() => {
          alert('notification opened')
        });
        
        this.oneSignal.endInit();

        this.oneSignal.getIds().then((user)=>{
          this.firestore.collection('Owner').doc(userID).update({
            playerID: user.userId
          }).then(()=>{
            this.isLoading = false;
            this.router.navigate(['/navigation'], {
              queryParams: { status: 'success' },
            });
          })
        })

        // this.router.navigate(['/navigation'], {
        //   queryParams: { status: 'success' },
        // });
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
