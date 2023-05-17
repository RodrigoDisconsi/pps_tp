import { Component, Input, OnInit } from '@angular/core';
import { AudioService, ILenguajeSeleccionado } from 'src/app/services/audio.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  @Input() data = [];
  @Input() opcion: ILenguajeSeleccionado;


  constructor(private audioService: AudioService)  { }

  ngOnInit() {}

  play(audioId: string)
  {
    console.log("Audio id: ",audioId);
    this.audioService.play(audioId);
  }

}
