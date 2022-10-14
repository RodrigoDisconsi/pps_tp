import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private mensajesService: MensajesService, private loadingController: LoadingController) 
  {
   
    this.presentLoading("Ingresando...");
  }

  ionViewWillEnter()
  {
    this.mensajesService.leer();
  }

  ngOnInit() 
  {
    this.mensajesService.leer();
  }

  async presentLoading(message) {
    const loading = await this.loadingController.create({
      message,
      duration: 2000,
      spinner: 'dots'
    });
    await loading.present();
  }
}
