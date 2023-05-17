import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AudioService, Idioma, ILenguajeSeleccionado } from 'src/app/services/audio.service';

@Component({
  selector: 'app-colores',
  templateUrl: './colores.page.html',
  styleUrls: ['./colores.page.scss'],
})
export class ColoresPage implements OnInit {
  opcion: ILenguajeSeleccionado;

  colores: { nombre,img, audio_es, audio_en, audio_pt }[] = 
  [
    {
      nombre: "Rojo",
      img: "/assets/img/rojo.svg",
      audio_es: "assets/audio/rojo_es.mp3",
      audio_en: "assets/audio/rojo_en.mp3",
      audio_pt: "assets/audio/rojo_pt.mp3"
    },
    {
      nombre: "Azul",
      img: "/assets/img/azul.svg",
      audio_es: "assets/audio/azul_es.mp3",
      audio_en: "assets/audio/azul_en.mp3",
      audio_pt: "assets/audio/azul_pt.mp3"
    },
    {
      nombre: "Amarillo",
      img: "/assets/img/amarillo.svg",
      audio_es: "assets/audio/amarillo_es.mp3",
      audio_en: "assets/audio/amarillo_en.mp3",
      audio_pt: "assets/audio/amarillo_pt.mp3"
    },
    {
      nombre: "Verde",
      img: "/assets/img/verde.svg",
      audio_es: "assets/audio/verde_es.mp3",
      audio_en: "assets/audio/verde_en.mp3",
      audio_pt: "assets/audio/verde_pt.mp3"
    },
    {
      nombre: "Negro",
      img: "/assets/img/negro.svg",
      audio_es: "assets/audio/negro_es.mp3",
      audio_en: "assets/audio/negro_en.mp3",
      audio_pt: "assets/audio/negro_pt.mp3"
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
  

  constructor(private audioService: AudioService) 
  {
    
  }

  ngOnInit() 
  {
    this.opcion = AudioService.idiomaSeleccionado; 
  }

  seleccionar(opcion: ILenguajeSeleccionado)
  {
    this.opcion.idioma = opcion.idioma;
    this.opcion.img = opcion.img;

    AudioService.idiomaSeleccionado = this.opcion;
    console.log(AudioService.idiomaSeleccionado);
  }


}
