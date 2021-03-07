import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCleaningServicesPageRoutingModule } from './view-cleaning-services-routing.module';

import { ViewCleaningServicesPage } from './view-cleaning-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewCleaningServicesPageRoutingModule
  ],
  declarations: [ViewCleaningServicesPage]
})
export class ViewCleaningServicesPageModule {}
