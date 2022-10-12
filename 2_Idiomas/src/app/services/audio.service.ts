import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Platform } from '@ionic/angular';
import { environment } from '../../environments/environment'

interface Sound {
  key: string;
  asset: string;
  isNative: boolean
}

export interface ILenguajeSeleccionado{
  idioma: string,
  img: string
}

export enum Idioma
{
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
  private forceWebAudio: boolean = true;
  public static idiomaSeleccionado: ILenguajeSeleccionado = {
    idioma: Idioma.Español,
    img : '/assets/img/spanish.png'
  };
  private numeros = environment.numeros;
  private colores = environment.colores;
  private animales = environment.animales;

  constructor(private platform: Platform, private nativeAudio: NativeAudio) 
  {
  }

  preload(key: string, asset: string): Promise<any> 
  {
    console.log(asset);

    return new Promise<any>( (resolve,reject) => {
      if(this.platform.is('cordova') && !this.forceWebAudio)
      {
        this.nativeAudio.preloadSimple(key, asset);

        this.sounds.push({
          key: key,
          asset: asset,
          isNative: true
        });
      } 
      else 
      {
        let audio = new Audio();
        audio.src = asset;

        this.sounds.push({
          key: key,
          asset: asset,
          isNative: false
        });
      }
      resolve;
    });
  }


  play(key: string): void {

    console.log(key);
    let soundToPlay = this.sounds.find((sound) => 
    {
      return sound.key === key;
    });

    console.log("SONIDO");
    console.log(soundToPlay);

    if(soundToPlay.isNative)
    {
      this.nativeAudio.play(soundToPlay.asset)
          .then((res) => {
            console.log(res);
          }, 
          (err) => {
            console.log(err);
          });
    } 
    else 
    {
      this.audioPlayer.src = soundToPlay.asset;
      this.audioPlayer.play();
    }

  }

  cargarAudio()
  {
    return new Promise<any>( (resolve, reject) => {
     
      for (let index = 0; index < this.numeros.length; index++) 
      {
        const numero =  this.numeros[index];
        console.log(numero);
        this.preload(numero.nombre + "-es", numero.audio_es);  
        this.preload(numero.nombre + "-en", numero.audio_en);  
        this.preload(numero.nombre + "-pt", numero.audio_pt);  
      }

      for (let index = 0; index < this.colores.length; index++) 
      {
        const color =  this.colores[index];
        console.log(color);
        this.preload(color.nombre + "-es", color.audio_es);  
        this.preload(color.nombre + "-en", color.audio_en);  
        this.preload(color.nombre + "-pt", color.audio_pt);  
      }

      for (let index = 0; index < this.animales.length; index++) 
      {
        const animal =  this.animales[index];
        console.log(animal);
        this.preload(animal.nombre + "-es", animal.audio_es);  
        this.preload(animal.nombre + "-en", animal.audio_en);  
        this.preload(animal.nombre + "-pt", animal.audio_pt);  
      }
      resolve;
    });
    
  }
}

