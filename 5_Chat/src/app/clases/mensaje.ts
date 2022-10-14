import { Usuario } from './usuario';

export class Mensaje
{
    id: string;
    texto: string;
    usuario: string;
    nombreUsuario: string;
    fecha: string;
    sala: string;

    public static CrearMensaje(id: string, texto: string, usuario: string, aliasUsuario: string, fecha: string,
                                sala: string)
    {
        let mensaje = new Mensaje();

        mensaje.id = id;
        mensaje.texto = texto;
        mensaje.usuario = usuario;
        mensaje.nombreUsuario = aliasUsuario;
        mensaje.fecha = fecha;
        mensaje.sala = sala;

        return mensaje;
    }   
}