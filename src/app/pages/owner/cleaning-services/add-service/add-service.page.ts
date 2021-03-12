import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CleaningService } from 'src/app/services/cleaning/cleaning.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.page.html',
  styleUrls: ['./add-service.page.scss'],
})
export class AddServicePage implements OnInit {

  serviceForm: FormGroup;
  businessID;
  userID;
  isUpload;
  images = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cleaningService: CleaningService,
    private storage: AngularFireStorage,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.businessID = params.id;
      this.userID = params.userID;
    })

    this.serviceForm = this.formBuilder.group({
      service: ['', [Validators.required, Validators.pattern('^[A-Z a-z]+$')]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]')]],
      description: [
        '',
        [Validators.required, Validators.pattern('^[A-Z a-z 0-9 ,. \r\n]+$')],
      ],
      image: ['', Validators.required],
    })
  }

  addService() {
    const {
      service,
      price,
      description
    } = this.serviceForm.value;

    const details = {
      businessID: this.businessID,
      ownerID: this.userID,
      service,
      price,
      description,
      images: this.images,
    }

    this.cleaningService.addService(details).then(() => {
      this.router.navigate(['view-cleaning-services'], {
        queryParams: {id: this.businessID, userID: this.userID}
      })
    })
  }

  uploadFile(event) {
    this.isUpload = true;
    const file = event.target.files[0];

    const fileName = file.name;
    const fileExt = fileName.split('.').pop();
    const filename = Math.random().toString(36).substring(2) + '.' + fileExt;
    const filePath = 'cleaners/services/' + filename;
    const task = this.storage.upload(filePath, file);
    const ref = this.storage.ref(filePath);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe((downloadURL) => {
            this.images.push(downloadURL);
            this.isUpload = false;
          });
        })
      )
      .subscribe();
  }

}
