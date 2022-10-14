import { AfterViewChecked, Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Mensaje } from 'src/app/clases/mensaje';
import { Usuario } from 'src/app/clases/usuario';
import { DataService } from 'src/app/services/data.service';
import { MensajesService, Salas } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-sala4a',
  templateUrl: './sala4a.page.html',
  styleUrls: ['./sala4a.page.scss'],
})
export class Sala4aPage implements OnInit, DoCheck {
  usuario: Usuario = new Usuario();
  mensaje : Mensaje;
  mensajes: Mensaje[];
  textoAuxiliar : string;
  color: string = "secondary";

  constructor(private dataService: DataService, private mensajeService: MensajesService) 
  {
    this.mensajes = MensajesService.mensajes.filter(msj => msj.sala == Salas._4A);
  }

  ngDoCheck(): void 
  {
    this.mensajes = MensajesService.mensajes.filter(msj => msj.sala == Salas._4A);
  }

  ngOnInit() 
  {
    this.cargarDatos();
  }

  onClick()
  {
    console.log("click");
  }

  enviar()
  {
    this.mensaje = new Mensaje();
    console.log(this.textoAuxiliar);
    if(this.textoAuxiliar)
    {
      this.mensaje = Mensaje.CrearMensaje('0',this.textoAuxiliar, this.usuario.id, this.usuario.alias,
                                          new Date().toUTCString(), Salas._4A);
      this.textoAuxiliar = null;
    }
  }

  cargarDatos()
  {
    this.dataService.obtenerLocal()
        .then(data => {
          console.log(data);
          this.usuario = Object.assign(new Usuario,data);
        });
  }


}
