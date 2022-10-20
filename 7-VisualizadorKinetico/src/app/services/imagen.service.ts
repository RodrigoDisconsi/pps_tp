import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastController } from '@ionic/angular';
import { Imagen, TipoImagen } from '../clases/imagen';
import { Usuario } from '../clases/usuario';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { UploadMetadata } from '@angular/fire/compat/storage/interfaces';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  public static fotosFeas: Imagen[] = [];
  public static fotosBonitas: Imagen[] = [];
  public static fotosUsuario: Imagen[] = [];
  public static imagenes = [];

  constructor(private storage: AngularFireStorage, private toastController: ToastController, private db: AngularFireDatabase) {
  }

  async sacarFoto(usuario: Usuario, tipo: TipoImagen): Promise<Imagen> {
    let imagen: Imagen = new Imagen();
    let carpeta;

    await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Base64,
      correctOrientation: true,
      source: CameraSource.Prompt,
      promptLabelHeader: 'Subir foto',
      promptLabelCancel: 'Cancelar',
      promptLabelPhoto: 'Subir desde galería',
      promptLabelPicture: 'Nueva foto',

    })
      .then(imageData => {
        console.log(imageData);
        imagen.base64 = imageData.base64String;
        imagen.fecha = new Date().toUTCString();
        imagen.usuario = usuario.id;
        imagen.nombreUsuario = usuario.nombre;
        imagen.tipo = tipo;
        imagen.votos = [];

        if (tipo == TipoImagen.POSITIVA) {
          ImagenService.fotosBonitas.push(imagen);
          //ImagenService.fotosBonitas.sort((a,b) => this.comparadorFechas(a.fecha,b.fecha));
          carpeta = "bonitas";
        }
        else if (tipo == TipoImagen.NEGATIVA) {
          ImagenService.fotosFeas.push(imagen);
          carpeta = "feas";
        }

        // Se sube imagen a Base de Datos
        // this.crear(imagen).then( img => {
        //   imagen = img;
        //   // Se guarda imagen en el Storage
        //   this.guardarImagen(imagen, carpeta)
        //       .then(snapshot => snapshot.ref.getDownloadURL()
        //                                 .then(res => imagen.url = res))
        //       .finally(() => this.actualizar(imagen));
        // })
        // .catch(console.error);
      })
      .catch(error => {
        this.presentToast(error);
      })
    return imagen;
  }

  async guardarImagen(imagen: Imagen, carpeta: string) {
    console.log("Guardar imagen-----------------------");
    const metadata: UploadMetadata = {
      contentType: 'image/jpeg',
      customMetadata: {
        user: imagen.usuario,
        userName: imagen.nombreUsuario,
        date: imagen.fecha,
        puntaje: imagen.votos.length.toString()
      }
    };

    console.log(imagen);
    // Se sube imagen al Firebase Storage
    return this.storage.ref(`${carpeta}/${imagen.id}`)
      .putString(imagen.base64, "base64", metadata);
  }

  public async descargarImagen(carpeta: string, usuario: string) {
    return this.storage.ref(`${carpeta}/${usuario}`).getDownloadURL()
  }

  private async crear(imagen: Imagen) {
    return this.db.list('/imagenes')
      .push(imagen);
  }

  public actualizar(imagen: Imagen): Promise<any> {
    return this.db.object('/imagenes/' + imagen.id)
      .update(imagen);
  }

  public borrar(id: number): Promise<any> {
    return this.db.object('/imagenes/' + id)
      .remove();
  }

  public async fetchAll() {
    return new Promise<any>((resolve, reject) => {
      this.db.list('/imagenes/').valueChanges().subscribe((resp) => {
        console.log(resp);
        resp.forEach((data: any) => {
          let aux = Imagen.CrearImagen(data.id, data.base64, data.url, data.usuario, data.nombreUsuario,
            data.fecha, data.tipo, data.votos);
          ImagenService.imagenes.push(aux);

        });
        this.getFeas();
        this.getLindas();
        resolve("OK");
      });
    });
  }

  public fetchUsuario(id: string) {
    ImagenService.fotosUsuario = ImagenService.imagenes.filter(img => img.usuario == id)
      .sort((a, b) => this.comparadorFechas(a, b));
  }

  public getFeas() {
    ImagenService.fotosFeas = ImagenService.imagenes
      .filter(img => img.tipo == TipoImagen.NEGATIVA)
      .sort((a, b) => this.comparadorFechas(a, b));
  }

  public getLindas() {
    ImagenService.fotosBonitas = ImagenService.imagenes
      .filter(img => img.tipo == TipoImagen.POSITIVA)
      .sort((a, b) => this.comparadorFechas(a, b));
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  comparadorFechas(fotoA: Imagen, fotoB: Imagen) {
    let retorno;

    if (new Date(fotoA.fecha).getTime() > new Date(fotoB.fecha).getTime()) {
      retorno = -1;
    }
    else if (new Date(fotoA.fecha).getTime() < new Date(fotoB.fecha).getTime()) {
      retorno = 1;
    }
    else {
      retorno = 0;
    }
    console.log(retorno);
    return retorno;
  }
}
