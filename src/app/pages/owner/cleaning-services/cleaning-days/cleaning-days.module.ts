import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CleaningDaysPageRoutingModule } from './cleaning-days-routing.module';

import { CleaningDaysPage } from './cleaning-days.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CleaningDaysPageRoutingModule
  ],
  declarations: [CleaningDaysPage]
})
export class CleaningDaysPageModule {}
