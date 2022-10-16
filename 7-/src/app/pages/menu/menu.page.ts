import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Imagen, TipoImagen } from 'src/app/clases/imagen';
import { Usuario } from 'src/app/clases/usuario';
import { DataService } from 'src/app/services/data.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { FeasPage } from '../feas/feas.page';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  usuario: Usuario;
  imagenes: Imagen[] = [];
  imageElement;
  rutas = 
  [
    {
      nombre: 'Feas',
      ruta: '/feas',
      src: "/assets/img/feo.jpg",
    },
    {
      nombre: 'Bonitas',
      ruta: '/bonitas',
      src: "/assets/img/bonito.jpg",
    },
    {
      nombre: 'Listado',
      ruta: '/listado',
      src: "/assets/img/photographer.png",
    },
    {
      nombre: 'Puntajes',
      ruta: '/graficos',
      src: "/assets/img/statistics.png",
    }
  ];
  seleccionado: string = '/feas';

  constructor(private router: Router,private loadingController: LoadingController, 
            private imagenService: ImagenService, private dataService: DataService)
  { 
    
  }

  ngOnInit() 
  {
    this.presentLoading("Cargando fotos...");
    this.dataService.gerUserDetail().then( data => {
      this.imagenService.fetchUsuario(data.uid)
    });
    this.dataService.obtenerLocal().then((resp) =>{
      console.log("OBTENER LOCAL - ", resp);
    });
  }

  
  async presentLoading(message) {
    const loading = await this.loadingController.create({
      message,
      duration: 3000,
      spinner: 'bubbles'
    });
    await loading.present();
  }


  navegar(ruta: string)
  {
      this.router.navigate([ruta]);
      console.log(ruta);
  }

}
