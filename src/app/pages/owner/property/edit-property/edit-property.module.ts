import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPropertyPageRoutingModule } from './edit-property-routing.module';

import { EditPropertyPage } from './edit-property.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPropertyPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [EditPropertyPage],
})
export class EditPropertyPageModule {}
