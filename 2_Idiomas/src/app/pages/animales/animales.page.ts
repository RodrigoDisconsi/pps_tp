import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AudioService, Idioma, ILenguajeSeleccionado } from 'src/app/services/audio.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-animales',
  templateUrl: './animales.page.html',
  styleUrls: ['./animales.page.scss'],
})
export class AnimalesPage implements OnInit, AfterViewInit {
  opcion: ILenguajeSeleccionado;
  
  animales: { nombre,img, audio_es, audio_en, audio_pt }[] = environment.animales;

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

  ngAfterViewInit()
  {
    
  }

  ngOnInit() {
    
  }

  play(audioId: string)
  {
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
