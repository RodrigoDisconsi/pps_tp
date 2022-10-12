import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { database } from 'firebase';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firebaseAuth: AngularFireAuth,
               private storage: Storage) 
  {
  }

  login(usuario: Usuario)
  {
    return new Promise<any>((resolve, reject) => {
      this.firebaseAuth.signInWithEmailAndPassword(usuario.email, usuario.pass)
                        .then(response => {
                          usuario.id = response.user.uid
                          console.log("RESPONSE USER ", response.user);
                          this.actualizar(usuario).then(() => {
                            this.guardarLocal(usuario).then(() =>{
                              resolve(response);
                            });
                          })
                          .catch((e) => reject(e));;
                        },
                        error => reject(error));
    });
  }

  registrar(usuario: Usuario)
  {
    return new Promise<any>((resolve,reject) => {
      this.firebaseAuth.createUserWithEmailAndPassword(usuario.email, usuario.pass)
                        .then(response => {
                          usuario.pass = null;
                          usuario.id = response.user.uid
                          this.crear(usuario).then(() => {
                            resolve(response);
                          });
                        }, 
                        error => reject(error));

    });

  }

  gerUserDetail()
  {
    return this.firebaseAuth.currentUser;
  }


  public crear(usuario: Usuario): Promise<any>
  {
    return database().ref('usuarios/' + usuario.id)
              .set(usuario);
  }

  public guardarLocal(usuario: Usuario)
  {
    return new Promise<any>((resolve, reject) => {
      database().ref('usuarios/' + usuario.id).once('value', (snapshot) =>{
        this.storage.set('usuario', snapshot.val()).then((resp) =>{
          resolve(resp);
        });
      }).catch((error) => reject(error));
    });
  }

  public obtenerLocal()
  {
    return this.storage.get('usuario');
  }

  public leer(): Usuario[]
  {
    let usuarios = [];
    console.info("Fetch de todos los Usuarios");

    database().ref('usuarios').on('value',(snapshot) => {          
        usuarios = [];  
        snapshot.forEach((child) =>{
          var data = child.val();
          usuarios.push(Usuario.CrearUsuario(child.key, data.nombre, data.email, data.imagenes,data.rol));
        });
        console.info("Fetch Usuarios");
    })
    return usuarios;
  }

  public actualizar(usuario: Usuario): Promise<any>
  {
    return database().ref('usuarios/' + usuario.id)
                  .update(usuario)
                  .then(() => console.info("Actualizacion exitosa"))
                  .catch(() => console.info("No se pudo actualizar"));
  }

  public borrar(id: number): Promise<any>
  {
    return database().ref('usuarios/' + id)
                  .remove()
                  .then(() => console.info("Usuario eliminado"))
                  .catch(() => console.info("No se pudo realizar la baja."));
  }
}
