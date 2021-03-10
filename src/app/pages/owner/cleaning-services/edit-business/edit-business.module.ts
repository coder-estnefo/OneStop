import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditBusinessPageRoutingModule } from './edit-business-routing.module';

import { EditBusinessPage } from './edit-business.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditBusinessPageRoutingModule
  ],
  declarations: [EditBusinessPage]
})
export class EditBusinessPageModule {}
