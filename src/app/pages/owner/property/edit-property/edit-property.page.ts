import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.page.html',
  styleUrls: ['./edit-property.page.scss'],
})
export class EditPropertyPage implements OnInit {
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
