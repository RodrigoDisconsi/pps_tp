import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Sala4aPageRoutingModule } from './sala4a-routing.module';

import { Sala4aPage } from './sala4a.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Sala4aPageRoutingModule,
    ComponentsModule
  ],
  declarations: [Sala4aPage]
})
export class Sala4aPageModule {}
