import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { SplashComponent } from './components/splash/splash.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private modalCtrl: ModalController,
    private router:Router
  ) 
  {
    platform.ready().then(() => {
      this.presentModal().then(() => this.router.navigate(['/home']));
    });
  }

  async presentModal() {

    const modal = await this.modalCtrl.create({
      component: SplashComponent,
    });

    return await modal.present();
  }
}
