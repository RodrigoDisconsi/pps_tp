import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/clases/usuario';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  perfiles = environment.perfil;
  mensaje: string;
  usuario: Usuario = new Usuario();
  rol: string = "";
  imgSrc = "../../../assets/img/icon.png";

  constructor(public alertCtrl: AlertController, 
              private dataService: DataService,
              public toastController: ToastController,
              private router: Router) 
  {}
  
  iniciarSesion(valor)
  {
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
