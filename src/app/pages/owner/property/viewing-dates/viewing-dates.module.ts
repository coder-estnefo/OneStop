import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewingDatesPageRoutingModule } from './viewing-dates-routing.module';

import { ViewingDatesPage } from './viewing-dates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ViewingDatesPageRoutingModule
  ],
  declarations: [ViewingDatesPage]
})
export class ViewingDatesPageModule {}
