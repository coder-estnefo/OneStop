import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CleaningService } from 'src/app/services/cleaning/cleaning.service';

@Component({
  selector: 'app-view-cleaning-services',
  templateUrl: './view-cleaning-services.page.html',
  styleUrls: ['./view-cleaning-services.page.scss'],
})
export class ViewCleaningServicesPage implements OnInit {

  serviceForm: FormGroup;
  businessID;
  userID;
  isUpload;
  images = [];
  services;

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private cleaningService: CleaningService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.router.queryParams.subscribe((params) => {
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

    this.cleaningService.getOwnerServices(this.userID, this.businessID).subscribe((response) => {
      this.services = response.map((service) => {
        return ({
          ...service.payload.doc.data() as Object
        })
      })
    })
  }

}
