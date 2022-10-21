import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { database } from 'firebase';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public static usuarioActual: Usuario;

  constructor(private firebaseAuth: AngularFireAuth,
    private storage: Storage) {
  }

  login(usuario: Usuario) {
    // return this.test(usuario);
    return new Promise<any>((resolve, reject) => {
      this.firebaseAuth.signInWithEmailAndPassword(usuario.email, usuario.pass)
        .then(async (response) => {
          console.log("Login");
          const resp = await this.guardarLocal(response.user.uid);
          resolve(resp);
        }, error => reject(error));
    });
  }

  registrar(usuario: Usuario) {
    return new Promise<any>((resolve, reject) => {
      this.firebaseAuth.createUserWithEmailAndPassword(usuario.email, usuario.pass)
        .then(response => {
          usuario.pass = null;
          this.crear(usuario, response.user.uid);
          resolve(response);
        },
          error => reject(error));
    });
  }

  gerUserDetail() {
    return this.firebaseAuth.currentUser;
  }

  public crear(usuario: Usuario, uid: string): Promise<any> {
    usuario.rol = "Usuario";
    usuario.codigos = ['0'];

    return database().ref('usuarios/' + uid)
      .set(usuario)
      .then(() => usuario.id = uid)
      .then(() => this.actualizar(usuario))
      .catch(() => console.info("No se pudo realizar alta"));
  }

  public guardarLocal(id: string) {
    console.log(id);

    return new Promise<any>(resolve => {
      database().ref('usuarios/' + id).on('value', async (snapshot) => {
        console.log("Guardar Local Storage");
        DataService.usuarioActual = snapshot.val();
        await this.storage.set('usuario', snapshot.val());
        resolve(DataService.usuarioActual);
      });
    })
  }

  public obtenerLocal(): Promise<void | Usuario> {
    return this.storage.get('usuario');
  }

  public leer(): Usuario[] {
    let usuarios = [];
    console.info("Fetch de todos los Usuarios");

    database().ref('usuarios').on('value', (snapshot) => {
      usuarios = [];
      snapshot.forEach((child) => {
        var data = child.val();
        usuarios.push(Usuario.CrearUsuario(child.key, data.nombre, data.dni, data.domicilio,
          data.telefono, data.email, data.credito, data.codigos, data.rol));
      });
      console.info("Fetch Usuarios");
    })
    return usuarios;
  }

  public actualizar(usuario: Usuario): Promise<any> {
    return database().ref('usuarios/' + usuario.id)
      .update(usuario)
      .then(() => this.guardarLocal(usuario.id))
      .catch(() => console.info("No se pudo actualizar"));
  }

  public borrar(id: number): Promise<any> {
    return database().ref('usuarios/' + id)
      .remove()
      .then(() => console.info("Usuario eliminado"))
      .catch(() => console.info("No se pudo realizar la baja."));
  }

  public fetchQR(codigoQR: string) {
    return database().ref(`codigos/${codigoQR}`).once('value');
  }




}
