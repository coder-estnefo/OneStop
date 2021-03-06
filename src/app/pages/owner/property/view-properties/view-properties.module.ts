import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPropertiesPageRoutingModule } from './view-properties-routing.module';

import { ViewPropertiesPage } from './view-properties.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ViewPropertiesPageRoutingModule
  ],
  declarations: [ViewPropertiesPage]
})
export class ViewPropertiesPageModule {}
