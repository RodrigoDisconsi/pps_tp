import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';
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
  login = "../assets/img/login.png";
  registro = "../assets/img/register.webp";
  mensaje: string;
  usuario: Usuario = new Usuario();
  selectUser: Subject<{mail:string, pass:string, rol:string}> = new Subject();

  constructor(public alertCtrl: AlertController, 
              private dataService: DataService,
              public toastController: ToastController,
              private router: Router,
              private popoverCtrl: PopoverController) { }

  ngOnInit() {
    this.selectUser.subscribe(async (user) => {
      console.log(user);
      this.popoverCtrl.dismiss();
      await this.promptSignIn(user);
    })
  }

  async promptSignIn(data?:{mail:string, pass:string, rol:string}) {
    const alert = await this.alertCtrl.create({
      translucent: true,
      mode: "md",
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Ingrese su email',
          value: data?.mail ?? '',
          
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Ingrese su contraseña',
          value: data?.pass ?? '',
          attributes: {
            minLength: 6
          }
        },
        {
          name: 'confirmacion',
          type: 'password',
          placeholder: 'Confirme su contraseña',
          value: data?.pass ?? '',
          attributes: {
            minLength: 6,
            required: true,
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
            if(!this.validarMail(data.email)){
              this.mensaje = "Mail inválido";
            }
            else if(!this.validarPassword(data.password)){
              this.mensaje = "Password inválida";
            }
            else if(!(data.password === data.confirmacion)){
              this.mensaje = "Contraseñas no coinciden";
            }
            else{
              this.usuario.email = data.email;
              this.usuario.pass = data.password;

              this.dataService.login(this.usuario).
              then(()=>{
                this.mensaje = "Sesión iniciada.";
                this.router.navigate(['/menu/']);
              }).
              catch( error => this.mensaje = 'Credenciales inválidas.').
              finally(() => this.presentToast());
              return;
            }
            this.presentToast();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.mensaje,
      position: 'top',
      duration: 20000,
      buttons: [
        {
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
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
      componentProps: {selectUser: this.selectUser},
      event: evento,
      mode: 'ios'
    });

    await popover.present();
  }
}
