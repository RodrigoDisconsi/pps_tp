import { Injectable } from '@angular/core';
import { Mensaje } from '../clases/mensaje';
import { database } from 'firebase';

export enum Salas
{
  _4A = 'sala4A',
  _4B = 'sala4B'
}

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  public static mensajes: Mensaje[] = [
    {
      id : '9',
      texto: "Windguardium Leviosa",
      usuario: '1',
      nombreUsuario: "Pepito",
      fecha: new Date().toUTCString(),
      sala: Salas._4A
    },
    {
      id : '9',
      texto: "Flipendo",
      usuario: '1',
      nombreUsuario: "Pepito",
      fecha: new Date().toUTCString(),
      sala: Salas._4B
    },
    {
      id : '9',
      texto: "Expecto Patronum",
      usuario: '1',
      nombreUsuario: "Pepito",
      fecha: new Date().toUTCString(),
      sala: Salas._4A
    }
  ];

  constructor() { }

  public crear(mensaje: Mensaje): Promise<any>
  {
    return database().ref('mensajes')
                    .push()
                    .then((snapshot) => mensaje.id = snapshot.key)
                    .then(() => this.actualizar(mensaje))
                    .catch(console.error);
  }

  public actualizar(mensaje: Mensaje): Promise<any>
  {
    return database().ref('mensajes/' + mensaje.id)
                    .update(mensaje)
                    .then(() => console.info("Actualizacion exitosa"))
                    .catch(() => console.info("No se pudo actualizar"));
  } 

  public leer()
  {
    let mensajes = [];
    console.info("Fetch de todos los mensajes");

    const fetch = new Promise<any>(resolve =>{
      database().ref('mensajes').on('value',(snapshot) => {          
        mensajes = [];  
          snapshot.forEach((child) =>{
            var data: Mensaje = child.val();
            mensajes.push(Mensaje.CrearMensaje(child.key, data.texto, data.usuario, data.nombreUsuario, 
                                                data.fecha, data.sala));
          });
          console.log(mensajes);
          // Se cargan los mensajes
          MensajesService.mensajes = mensajes;
          resolve;
      })
    });
    return fetch;
  }
}

