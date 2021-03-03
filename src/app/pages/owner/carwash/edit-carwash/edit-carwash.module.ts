import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCarwashPageRoutingModule } from './edit-carwash-routing.module';

import { EditCarwashPage } from './edit-carwash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCarwashPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditCarwashPage]
})
export class EditCarwashPageModule {}
