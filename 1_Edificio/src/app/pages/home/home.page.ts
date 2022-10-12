import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { mainModule } from 'process';
import { TipoImagen } from 'src/app/clases/imagen';
import { Usuario } from 'src/app/clases/usuario';
import { DataService } from 'src/app/services/data.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  perfiles = environment.usuario;
  mensaje: string;
  usuario: Usuario = new Usuario();
  rol: string = "";
  pattern = new RegExp(/^[a-zA-Z0-9\-\.]+@[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,5}$/); 

  constructor(public alertCtrl: AlertController, 
              private dataService: DataService,
              public toastController: ToastController,
              private router: Router,
              private imagenService: ImagenService) {
               }

  ngOnInit() 
  {
    this.imagenService.fetchAll();
  }

  async presentAlertPrompt() {
    const alert = await this.alertCtrl.create({
      translucent: true,
      header: 'Iniciar sesión',
      mode: "ios",
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Ingrese su correo electrónico',
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Ingrese su contraseña',
          attributes: {
            minLength: 6
          },
          min: 6,
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Entrar',
          handler: (data) => {
            if(this.isEmail(data.email) && 
              this.isPassword(data.password))
            {
              this.usuario.email = data.email;
              this.usuario.pass = data.password;
              this.dataService.login(this.usuario).then(()=>{
                this.presentToast("Sesión iniciada.");
                this.router.navigate(['/menu']);
              }).
              catch( err => this.presentToast(err));
            }
            else
            {
              this.presentToast("Revise su email y contraseña");
            }
            
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }


  iniciarSesion(event)
  {
     this.rol = event.detail.value;
  
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

  isEmail(email)
  {
    if(this.pattern.test(email))
    {
      return true;
    }
    return false;
  }

  isPassword(password)
  {
    if(password.length >= 6)
    {
      return true;
    }
    return false;
  }


}
