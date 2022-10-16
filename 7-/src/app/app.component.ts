import { Component, OnInit, enableProdMode } from '@angular/core';

import { ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashComponent } from './components/splash/splash.component';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
              private platform: Platform,
              private splashScreen: SplashScreen,
              private statusBar: StatusBar,
              private modalCtrl: ModalController,
              private router: Router) {
                this.splashScreen.show();
    platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.presentModal().then(() => this.router.navigate(['/home']));
    });

  }

  async presentModal() {


    const modal = await this.modalCtrl.create({
      component: SplashComponent
    });


    return await modal.present();
  }
}
