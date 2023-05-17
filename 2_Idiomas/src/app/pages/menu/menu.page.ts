import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, ViewWillEnter } from '@ionic/angular';
import { AudioService, Idioma, ILenguajeSeleccionado } from 'src/app/services/audio.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  opcion: ILenguajeSeleccionado;
  selectedTheme;
  themes: { img: string, route: string }[] = [
    {
      img: '/assets/img/animales_1.jpg',
      route: '/menu/animales'
    },
    {
      img: '/assets/img/colores_1.jpg',
      route: '/menu/colores'
    },
    {
      img: '/assets/img/numeros_2.jpg',
      route: '/menu/numeros'
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

  constructor(private router:Router) 
  {
    this.opcion = AudioService.idiomaSeleccionado; 
    this.selectedTheme = this.themes[0];
    
  }

  ngOnInit() {
    console.log(this.router.url);
    if(this.router.url.includes('animales')){
      this.selectedTheme = this.themes[0];
    }
    else if(this.router.url.includes('colores')){
      this.selectedTheme = this.themes[1];
    }
    else{
      this.selectedTheme = this.themes[2];
    }
  }

  seleccionar(opcion: ILenguajeSeleccionado)
  {   
    this.opcion.idioma = opcion.idioma;
    this.opcion.img = opcion.img;

    AudioService.idiomaSeleccionado = this.opcion;
    console.log(AudioService.idiomaSeleccionado);
  }

  seleccionarTheme(theme)
  {   
    this.selectedTheme = theme;
    console.log(theme.route);
    this.router.navigateByUrl(theme.route);
  }
}
