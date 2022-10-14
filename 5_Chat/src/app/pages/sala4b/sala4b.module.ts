import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Sala4bPageRoutingModule } from './sala4b-routing.module';

import { Sala4bPage } from './sala4b.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Sala4bPageRoutingModule,
    ComponentsModule
  ],
  declarations: [Sala4bPage]
})
export class Sala4bPageModule {}
