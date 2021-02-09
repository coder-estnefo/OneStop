import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.page.html',
  styleUrls: ['./add-property.page.scss'],
})
export class AddPropertyPage implements OnInit {
  showDetails = true;
  showImages = false;

  constructor() {}

  ngOnInit() {}

  continue() {
    this.images();
  }

  details() {
    this.showDetails = true;
    this.showImages = false;
  }

  images() {
    this.showDetails = false;
    this.showImages = true;
  }
}
