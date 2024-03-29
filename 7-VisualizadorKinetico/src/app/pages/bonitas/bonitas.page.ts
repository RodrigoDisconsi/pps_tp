import { Component, DoCheck, OnInit } from '@angular/core';
import { Camera } from '@capacitor/camera';
import { LoadingController, ToastController } from '@ionic/angular';
import { Imagen, TipoImagen } from 'src/app/clases/imagen';
import { Usuario } from 'src/app/clases/usuario';
import { DataService } from 'src/app/services/data.service';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-bonitas',
  templateUrl: './bonitas.page.html',
  styleUrls: ['./bonitas.page.scss'],
})
export class BonitasPage implements OnInit, DoCheck {
  usuario: Usuario;
  imagenes: Imagen[] = [];

  constructor(private dataService: DataService, 
              private imagenService: ImagenService,
              private loadingController: LoadingController,
              private toastController: ToastController) 
  {
    this.usuario = new Usuario();
    this.dataService.obtenerLocal()
        .then( data => {
          this.usuario = JSON.parse(data.value) as Usuario;
          console.info(this.usuario);
        });

  }

  ngOnInit() 
  {
    console.log("INIT");
     // Cargo las imagenes guardadas
     this.imagenes = ImagenService.fotosBonitas;
  }

  ngDoCheck(): void {
    console.log("Do CHECK");
      // Cargo las imagenes guardadas
    this.imagenes = ImagenService.fotosBonitas;
    
  }

  async subirFoto() 
  {
    this.imagenService.sacarFoto(this.usuario, TipoImagen.POSITIVA)
                      .then(imagen => this.usuario.imagenes.push(imagen.id))
                      .catch(console.error)
                      .finally(() => this.dataService.actualizar(this.usuario));
  }

  async subirVarias() 
  {
    this.imagenService.subirVariasFotos(this.usuario, TipoImagen.POSITIVA)
                      .then(imagenes => {
                        imagenes.forEach((imagen) => {
                          this.usuario.imagenes.push(imagen.id);
                        });
                      })
                      .catch(console.error)
                      .finally(() => this.dataService.actualizar(this.usuario));
  }

  async presentLoading(message) {
    const loading = await this.loadingController.create({
      message,
      duration: 1000,
      spinner: 'crescent'
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
