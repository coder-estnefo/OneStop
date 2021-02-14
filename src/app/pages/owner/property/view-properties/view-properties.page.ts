import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { PropertyService } from 'src/app/services/property/property.service';

export interface property {
  ownerID: number;
  province: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  garages: number;
  description: string;
  images: string[];
  availability_status: string;
  popular: boolean;
  propertyID: string;
  docID: string;
}

@Component({
  selector: 'app-view-properties',
  templateUrl: './view-properties.page.html',
  styleUrls: ['./view-properties.page.scss'],
})
export class ViewPropertiesPage implements OnInit {
  properties = [];

  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  constructor(
    private propertyService: PropertyService,
    private auth: AngularFireAuth,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      this.propertyService.getOwnerProperties(user.uid).subscribe((array) => {
        this.properties = array.map((property) => {
          return ({
            docID: property.payload.doc.id,
            ...(property.payload.doc.data() as Object),
          } as unknown) as property;
        });
      });
    });
  }

  editProperty(docID) {
    this.router.navigate(['/edit-property'], {
      queryParams: { docID: docID },
    });
  }

  logout() {
    this.loginService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
