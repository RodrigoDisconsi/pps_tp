import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from '../clases/usuario';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  userRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase, private firebaseAuth: AngularFireAuth) {
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
    return this.db.object('/usuarios/' + usuario.id)
    .set(usuario);
}

public guardarLocal(usuario: Usuario)
{
return new Promise<any>((resolve, reject) => {
this.db.object('usuarios/' + usuario.id).snapshotChanges().subscribe( async (snapshot) => {
    await Preferences.set({
      key: 'Usuario',
      value: JSON.stringify(snapshot.payload)
    }).then((resp) =>{
    resolve(resp);
    });
});
// this.storage.set('usuario', snapshot.val()).then((resp) =>{
// resolve(resp);
// });
// }).catch((error) => reject(error));
});
}

public async obtenerLocal()
{
return Preferences.get({key: 'Usuario'});
}

// public async leer()
// {
// let usuarios = [];
// console.info("Fetch de todos los Usuarios");

// let usersRef = await this.db.list('usuarios');

// usersRef.valueChanges();
// this.db.list('usuarios').on('value',(snapshot) => {          
// usuarios = [];  
// snapshot.forEach((child) =>{
// var data = child.val();
// usuarios.push(Usuario.CrearUsuario(child.key, data.nombre, data.email, data.imagenes,data.rol));
// });
// console.info("Fetch Usuarios");
// })
// return usuarios;
// }

public actualizar(usuario: Usuario): Promise<any>
{
return this.db.object('usuarios/' + usuario.id)
       .update(usuario);
}

public borrar(id: number): Promise<any>
{
return this.db.object('usuarios/' + id)
       .remove();
}
}
