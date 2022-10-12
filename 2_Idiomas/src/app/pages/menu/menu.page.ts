import { Component, OnInit } from '@angular/core';
import { Platform, ViewWillEnter } from '@ionic/angular';
import { AudioService, Idioma, ILenguajeSeleccionado } from 'src/app/services/audio.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit, ViewWillEnter {
  opcion: ILenguajeSeleccionado;
  slides: { img: string, route: string }[] = [
    {
      img: '/assets/img/animales_1.jpg',
      route: '/animales'
    },
    {
      img: '/assets/img/colores_1.jpg',
      route: '/colores'
    },
    {
      img: '/assets/img/numeros_2.jpg',
      route: '/numeros'
    },
  ];

  banderas : ILenguajeSeleccionado[] = [
    {
      idioma: Idioma.Español,
      img : '/assets/img/spanish.png'
    },
    {
      idioma: Idioma.Ingles,
      img : '/assets/img/english.png'
    },
    {
      idioma: Idioma.Portugues,
      img : '/assets/img/portuguese.png'
    }
  ];

  constructor(private audioService: AudioService, private platform: Platform) 
  {
    this.opcion = AudioService.idiomaSeleccionado; 
    
  }
  ionViewWillEnter(): void {
    // por defecto Español
    console.log("View ENTER");
  }

  ngOnInit() {
  }

  seleccionar(opcion: ILenguajeSeleccionado)
  {   
    this.opcion.idioma = opcion.idioma;
    this.opcion.img = opcion.img;

    AudioService.idiomaSeleccionado = this.opcion;
    console.log(AudioService.idiomaSeleccionado);
  }
}
