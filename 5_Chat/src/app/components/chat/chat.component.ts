import { AfterViewChecked, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonContent, ViewDidEnter, ViewWillEnter } from '@ionic/angular';
import { Mensaje } from 'src/app/clases/mensaje';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {
  @Input() mensajes: Mensaje[] = [];
  @Input() mensaje: Mensaje;
  @Input() idUsuario: string;
  @Input() color;

  @ViewChild(IonContent, {read: IonContent, static: false}) content: IonContent;

  constructor(private mensajesService: MensajesService) 
  { 
  }

  ngOnInit(): void {
   
    this.scrollToBottomOnInit();
  }
 

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    console.log("After View Checked");
    if(this.mensaje)
    {
      console.log("Mensaje: ", this.mensaje);
      this.cargarMensaje();
    }
  }

  ngOnDestroy(): void {

  
  }

  cargarMensaje()
  {
    console.log(this.mensaje);
    if(this.mensaje)
    {
      this.mensajes.push(this.mensaje);
      this.mensajesService.crear(this.mensaje);
      this.mensaje = null;
    }
  }


  scrollToBottomOnInit() {
    console.log("SCROLLING");
    setTimeout(() => {
        this.content.scrollToBottom(300);
    }, 500);
  }

  cambiarColor()
  {
    let estilo;

    if(this.color == 'primary')
    {
      estilo = {
        background: '--ion-color-primary !important'
      }
    }
    else if(this.color == 'secondary')
    {
      estilo = {
        background: '--ion-color-secondary !important'
      }
    }

    return estilo;
  }
}
