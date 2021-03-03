import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCarwashPageRoutingModule } from './add-carwash-routing.module';

import { AddCarwashPage } from './add-carwash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCarwashPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddCarwashPage]
})
export class AddCarwashPageModule {}
