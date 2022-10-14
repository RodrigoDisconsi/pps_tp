import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/clases/usuario';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: Usuario = new Usuario();
  pattern=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;  
  confirmacionPass: string;
  mensaje: string;

  constructor(private dataService: DataService,
              public toastController: ToastController, public loadingController: LoadingController,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmitTemplate()
  {
    if(this.usuario)
    {
      this.dataService.login(this.usuario).then(res => {
        console.log(res)
        this.presentLoading("Cargando datos...");
        this.presentToast("Se ha registrado exitosamente");
        this.router.navigate(['/menu']);
        
      }, error => {
        console.error(error);
        this.presentToast(error.message);
      });
    }
    
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }


  async presentLoading(message) {
    const loading = await this.loadingController.create({
      message,
      duration: 3000,
    });
    await loading.present();

    console.log('Loading dismissed!');
  }

}
