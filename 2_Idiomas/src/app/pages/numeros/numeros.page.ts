import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AudioService, Idioma, ILenguajeSeleccionado } from 'src/app/services/audio.service';

@Component({
  selector: 'app-numeros',
  templateUrl: './numeros.page.html',
  styleUrls: ['./numeros.page.scss'],
})
export class NumerosPage implements OnInit {
  opcion: ILenguajeSeleccionado;

  numeros: { nombre,img, audio_es, audio_en, audio_pt }[] = 
  [
    {
      nombre: "1",
      img: "/assets/img/1.jpg",
      audio_es: "assets/audio/uno_es.mp3",
      audio_en: "assets/audio/1_en.mp3",
      audio_pt: "assets/audio/1_pt.mp3"
    },
    {
      nombre: "2",
      img: "/assets/img/2.jpg",
      audio_es: "assets/audio/dos_es.mp3",
      audio_en: "assets/audio/2_en.mp3",
      audio_pt: "assets/audio/2_pt.mp3"
    },
    {
      nombre: "3",
      img: "/assets/img/3.jpg",
      audio_es: "assets/audio/tres_es.mp3",
      audio_en: "assets/audio/3_en.mp3",
      audio_pt: "assets/audio/3_pt.mp3"
    },
    {
      nombre: "4",
      img: "/assets/img/4.jpg",
      audio_es: "assets/audio/cuatro_es.mp3",
      audio_en: "assets/audio/4_en.mp3",
      audio_pt: "assets/audio/4_pt.mp3"
    },
    {
      nombre: "5",
      img: "/assets/img/5.jpg",
      audio_es: "assets/audio/cinco_es.mp3",
      audio_en: "assets/audio/5_en.mp3",
      audio_pt: "assets/audio/5_pt.mp3"
    }
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
    this.opcion = AudioService.idiomaSeleccionado; 
  }
  ngOnInit() 
  {
  }

  play(audioId: string)
  {
    console.log("Audio id: ",audioId);
    this.audioService.play(audioId);
  }

  seleccionar(opcion: ILenguajeSeleccionado)
  {
    this.opcion.idioma = opcion.idioma;
    this.opcion.img = opcion.img;

    AudioService.idiomaSeleccionado = this.opcion;
    console.log(AudioService.idiomaSeleccionado);
  }

}
