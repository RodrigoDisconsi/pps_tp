import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { SplashComponent } from './splash/splash.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [
    HeaderComponent,
    SplashComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    PipesModule
  ],
  exports: [
    HeaderComponent,
    SplashComponent,
    ChatComponent
  ]
})
export class ComponentsModule { }
