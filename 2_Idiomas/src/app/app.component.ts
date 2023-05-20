import { Component } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { SplashComponent } from './components/splash/splash.component';
import { AudioService } from './services/audio.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private modalCtrl: ModalController,
    private audioService: AudioService
  ) {
    this.audioService.cargarAudios();
    this.platform.ready().then(() => {
      this.presentModal();
      });
  }

  async presentModal() {
    this.statusBar.styleDefault();

    const modal = await this.modalCtrl.create({
      component: SplashComponent,
    });

    return await modal.present();
  }
}
