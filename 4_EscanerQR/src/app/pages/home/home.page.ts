import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/clases/usuario';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario: Usuario;
  perfiles = environment.usuario;
  rol: string = "";

  constructor(private router: Router, 
              private actionSheetCtrl: ActionSheetController,
              public toastController: ToastController,
              private dataService: DataService,) {}

  segmentChanged(event)
  {
    const opcion = event.detail.value;

    this.router.navigate([`/${opcion}`]);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Perfiles de usuario',
      translucent: true,
      buttons: [{
        text: 'Admin',
        role: 'close',
        icon: 'star',
        handler: () => {
          this.iniciarSesion('Admin');
        }
      }, {
        text: 'Tester',
        role: 'close',
        icon: 'share',
        handler: () => {
          this.iniciarSesion('Tester');
        }
      }, {
        text: 'Usuario',
        role: 'close',
        icon: 'person',
        handler: () => {
          this.iniciarSesion('Usuario');
        }
      }]
    });
    await actionSheet.present();
  }

  iniciarSesion(valor: string)
  {
      this.usuario = new Usuario();
     this.rol = valor;
  
      switch(this.rol)
      {
        case 'Admin' :
          this.usuario.email = this.perfiles.admin.email;
          this.usuario.pass = this.perfiles.admin.pass;
          this.usuario.rol = this.perfiles.admin.rol;
          break;
        case 'Tester' :
          this.usuario.email = this.perfiles.tester.email;
          this.usuario.pass = this.perfiles.tester.pass;
          this.usuario.rol = this.perfiles.tester.rol;
          break;
        case 'Usuario' :
          this.usuario.email = this.perfiles.usuario.email;
          this.usuario.pass = this.perfiles.usuario.pass;
          this.usuario.rol = this.perfiles.usuario.rol;
          break;
      }
      console.log(this.usuario);
      this.dataService.login(this.usuario).then(()=>{
        this.presentToast(`Perfil : ${this.usuario.rol}`);
        this.router.navigate(['/menu']);
      }).
      catch( err => this.presentToast(err));

  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
