import { Component, Input, OnInit } from '@angular/core';
import { Imagen } from 'src/app/clases/imagen';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.scss'],
})
export class TarjetasComponent implements OnInit {
  @Input() titulo = "";
  @Input() imagenes: Imagen[] = [];

  constructor() {
    
  }

  ngOnInit() {}

 

}
