import { Component, DoCheck, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Imagen, TipoImagen } from 'src/app/clases/imagen';
import { Usuario } from 'src/app/clases/usuario';
import { DataService } from 'src/app/services/data.service';
import { ImagenService } from 'src/app/services/imagen.service';

const { Camera } = Plugins;

@Component({
  selector: 'app-feas',
  templateUrl: './feas.page.html',
  styleUrls: ['./feas.page.scss'],
})
export class FeasPage implements OnInit, DoCheck {
  usuario: Usuario;
  imagenes: Imagen[] = [];
  
  constructor(private dataService: DataService, 
              private imagenService: ImagenService,
              private loadingController: LoadingController,
              private toastController: ToastController) 
  {
    this.usuario = new Usuario();
    // Cargo el usuario logueado
    this.dataService.obtenerLocal()
        .then( data => {
          console.log("OBTENER LOCAL - ", data);
          this.usuario = data as Usuario;
          console.info(this.usuario);
        });

  }

  ngOnInit() 
  {
    console.log("INIT");
      // Cargo las imagenes guardadas
    this.imagenes = ImagenService.fotosFeas;
  }

  ngDoCheck(): void {
    console.log("Do CHECK");
      // Cargo las imagenes guardadas
    this.imagenes = ImagenService.fotosFeas;
    
  }

  async subirFoto() 
  {
    this.imagenService.sacarFoto(this.usuario, TipoImagen.NEGATIVA)
                      .then(imagen => this.usuario.imagenes.push(imagen.id))
                      .catch(console.error)
                      .finally(() => this.dataService.actualizar(this.usuario));
  }

  async presentLoading(message) {
    const loading = await this.loadingController.create({
      message,
      duration: 2000,
      spinner: "crescent"
    });
    await loading.present();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
