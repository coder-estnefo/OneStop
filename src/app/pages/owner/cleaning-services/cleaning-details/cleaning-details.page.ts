import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { finalize } from 'rxjs/operators';
import { CleaningService } from 'src/app/services/cleaning/cleaning.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-cleaning-details',
  templateUrl: './cleaning-details.page.html',
  styleUrls: ['./cleaning-details.page.scss'],
})
export class CleaningDetailsPage implements OnInit {

  cleanersForm: FormGroup;
  isUpload = false;
  imagesList = [];
  imagesUrls = [];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private cleaningService: CleaningService
  ) { }

  ngOnInit() {
    this.cleanersForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Z a-z]+$')]],
      address: this.formBuilder.array([
        ['', [Validators.required, Validators.pattern('^[0-9 A-Z a-z]+$')]],
        ['', [Validators.required, Validators.pattern('^[A-Z a-z]+$')]],
        ['', [Validators.required, Validators.pattern('^[A-Z a-z -]+$')]],
        ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      ]),
      cleanersImages: this.formBuilder.array([this.formBuilder.control('')]),
    });
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
      favorite: false,
      images

    };

    this.cleaningService
      .addCleanersDetails(details)
      .then(() => {
        this.isUpload = false;
      })
      .catch(() => {
        this.isUpload = false;
      });

    this.cleanersForm.reset();
    this.imagesList = [];
    this.imagesUrls = [];
    //this.resetCleanersImages();
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

  logout() {
    this.loginService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
