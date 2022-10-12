import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { IonicModule } from '@ionic/angular';
import { SplashComponent } from './splash/splash.component';
import { TarjetasComponent } from './tarjetas/tarjetas.component';
import { VotosPipe } from '../pipes/votos.pipe';
import { AppModule } from '../app.module';
import { ChartModule } from 'angular-highcharts';

import { GraficoBarrasComponent } from './widgets/grafico-barras/grafico-barras.component';
import { GraficoTortaComponent } from './widgets/grafico-torta/grafico-torta.component';



@NgModule({
  declarations: [
    HeaderComponent, 
    TarjetaComponent,
    TarjetasComponent,
    SplashComponent,
    GraficoBarrasComponent,
    GraficoTortaComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ChartModule
    
  ],
  exports: [
    HeaderComponent,
    TarjetaComponent,
    TarjetasComponent,
    SplashComponent,
    GraficoBarrasComponent,
    GraficoTortaComponent
  ]
})
export class ComponentsModule { }
