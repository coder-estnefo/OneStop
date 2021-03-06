import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCleaningServicesPageRoutingModule } from './view-cleaning-services-routing.module';

import { ViewCleaningServicesPage } from './view-cleaning-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ViewCleaningServicesPageRoutingModule
  ],
  declarations: [ViewCleaningServicesPage]
})
export class ViewCleaningServicesPageModule {}
