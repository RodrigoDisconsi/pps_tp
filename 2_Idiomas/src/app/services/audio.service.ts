import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

interface Sound {
  key: string;
  asset: string;
  isNative: boolean
}

export interface ILenguajeSeleccionado {
  idioma: string,
  img: string
}

export enum Idioma {
  Español = 'es',
  Ingles = 'en',
  Portugues = 'pt'
}


@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private sounds: Sound[] = [];
  private audioPlayer: HTMLAudioElement = new Audio();
  public static idiomaSeleccionado: ILenguajeSeleccionado = {
    idioma: Idioma.Español,
    img: '/assets/img/spanish.png'
  };
  private numeros = environment.numeros;
  private colores = environment.colores;
  private animales = environment.animales;

  constructor() {
  }

  play(key: string){
    let soundToPlay = this.sounds.find((sound) => {
      return sound.key === key;
    });

    let audioAsset = new Audio(soundToPlay.asset);
    audioAsset.play();
  }

  preload(key: string, asset: string){
      this.sounds.push({
        key: key,
        asset: asset,
        isNative: false
      });
  }

  cargarUnAudio(data) {
    for (let index = 0; index < data.length; index++) {
      const value = data[index];
      this.preload(value.nombre + "_es", value.audio_es);
      this.preload(value.nombre + "_en", value.audio_en);
      this.preload(value.nombre + "_pt", value.audio_pt);
    }
  }

  cargarAudios(){

    this.cargarUnAudio(this.animales);
    this.cargarUnAudio(this.colores);
    this.cargarUnAudio(this.numeros);
  }

}

