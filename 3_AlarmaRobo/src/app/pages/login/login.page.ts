import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/clases/usuario';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nombre: string;
  usuario: Usuario = new Usuario();
  pattern = "^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$";
  mensaje: string;

  constructor(public toastController: ToastController, private dataService: DataService) { }

  ngOnInit() {
  }

  onSubmitTemplate() {
    console.log('Form submit');

    this.dataService.login(this.usuario)
                    .then(res => {
                      console.log(res);
                      this.mensaje = "Login correcto";
                    }, 
                    error => {
                      console.error(error);
                      this.mensaje = "Login denegado";
                    })
                    .finally(() => this.presentToast());

    this.usuario = new Usuario();
    console.log(this.dataService.gerUserDetail());
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.mensaje,
      duration: 2000
    });
    toast.present();
  }
}
