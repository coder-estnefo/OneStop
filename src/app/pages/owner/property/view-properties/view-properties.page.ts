import { Component, OnInit } from '@angular/core';
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

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.propertyService.getOwnerProperties(678290).subscribe((array) => {
      this.properties = array.map((property) => {
        return ({
          id: property.payload.doc.id,
          ...(property.payload.doc.data() as Object),
        } as unknown) as property;
      });
    });
  }
}
