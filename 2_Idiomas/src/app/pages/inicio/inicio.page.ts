import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/clases/usuario';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { AudioService } from 'src/app/services/audio.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  login = "../assets/img/login.svg";
  registro = "../assets/img/register.svg";
  mensaje: string;
  usuario: Usuario = new Usuario();

  constructor(public alertCtrl: AlertController, 
              private dataService: DataService,
              public toastController: ToastController,
              private router: Router,
              private popoverCtrl: PopoverController,
              private audioService: AudioService) { }

  ngOnInit() {
    
  }


  async promptSignIn() {
    const alert = await this.alertCtrl.create({
      translucent: true,
      mode: "ios",
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Ingrese su email',
          
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Ingrese su contraseña',
          attributes: {
            minLength: 6
          }
        }
        

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.usuario.email = data.email;
            this.usuario.pass = data.password;

            if(this.validarMail(data.email) && this.validarPassword(data.password))
            {
              this.dataService.login(this.usuario).
              then(()=>{
                this.mensaje = "Sesión iniciada.";
                this.router.navigate(['/inicio']);
              }).
              catch( error => this.mensaje = error).
              finally(() => this.presentToast());
            }
            else
            {
              this.mensaje = "Revisar email o contraseña";
              this.presentToast();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async promptSignUp() {
    const alert = await this.alertCtrl.create({
      translucent: true,
      mode: "ios",
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Ingrese su email',
          
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Ingrese su contraseña',
          attributes: {
            minLength: 6
          }
        },
        {
          name: 'confirmacion',
          type: 'password',
          placeholder: 'Confirme su contraseña',
          attributes: {
            minLength: 6
          }
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log(data);
           
            if(data.password === data.confirmacion && 
              this.validarMail(data.email) && 
              this.validarPassword(data.password))
            {
              this.usuario.email = data.email;
              this.usuario.pass = data.password;

              this.dataService.registrar(this.usuario).
              then(()=>{
                this.mensaje = "Alta exitosa.";
                this.router.navigate(['/inicio']);
              }).
              catch( error => this.mensaje = error).
              finally(() => this.presentToast());
            }
            else
            {
              this.mensaje = "Revisar email o contraseña";
              this.presentToast();
            }
            
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.mensaje,
      duration: 2000
    });
    toast.present();
  }

  validarMail(mail: string): boolean
  {
     const pattern = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

    if(pattern.test(mail))
    {
      return true;
    }
    return false;
  }

  validarPassword(password: string): boolean
  {
    if(password.length >= 6)
    {
      return true;
    }
    return false;
  }

  async togglePopover( evento )
  {
    const popover = await this.popoverCtrl.create({
      component: PopinfoComponent,
      event: evento,
      mode: 'ios'
    });

    await popover.present();

    // const { data } = await popover.onDidDismiss();
  }
}
