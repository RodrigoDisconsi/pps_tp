import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/clases/usuario';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  usuario: Usuario = new Usuario();
  checkUsuario: boolean = false;
  checkAdmin: boolean = false;
  checkTester: boolean = false;
  selectedUser: any;
  perfiles = environment.perfiles;
  principal = "../assets/img/alarm.svg";
  rol: string = "";
  nombre: string;
  pattern = "^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$";
  mensaje: string;
  loginForm: FormGroup;
  dirty:boolean = false;

  constructor(public toastController: ToastController, private dataService: DataService, private form: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  cargarSesion(event, tipo) {
    if (!this.dirty) {
      if (!event.detail.checked && tipo === this.rol) {
        this.usuario = new Usuario();
        this.rol = '';
      } else {
        if (this.rol && tipo !== this.rol) {
          this.dirty = true;
        }
    
        // Desactivar todos los toggles
        this.checkAdmin = false;
        this.checkUsuario = false;
        this.checkTester = false;
    
        // Activar el toggle seleccionado
        if (tipo === 'admin') {
          this.checkAdmin = true;
        } else if (tipo === 'tester') {
          this.checkTester = true;
        } else if (tipo === 'usuario') {
          this.checkUsuario = true;
        }
    
        this.rol = tipo;
        this.usuario.email = this.perfiles[tipo].email;
        this.usuario.pass = this.perfiles[tipo].pass;
        this.usuario.rol = this.perfiles[tipo].rol;
      }
    
      this.loginControls.email.setValue(this.usuario.email);
      this.loginControls.pass.setValue(this.usuario.pass);
    } else {
      this.dirty = false;
    }
  }

  get loginControls() {
    return this.loginForm.controls;
  }

  onSubmitTemplate() {
    console.log('Form submit');
    this.usuario = this.loginForm.value as Usuario;

    this.dataService.login(this.usuario)
      .then(res => {
        this.router.navigate(['/menu']);
      },
        error => {
          console.error(error);
          this.mensaje = "Credenciales inválidas";
          this.presentToast()
        });

    this.usuario = new Usuario();
    console.log(this.dataService.gerUserDetail());
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.mensaje,
      duration: 2000,
      color: 'warning',
      cssClass: 'warning-alert', // Clase CSS para estilo de advertencia
      buttons: [
        {
          icon: 'warning-outline',
          role: 'cancel', // Opcional: establece el botón como cancelar
          cssClass: 'cancel-button' // Clase CSS para estilo del botón de cancelar
        }
      ]
    });
    toast.present();
  }

  getErrorMessage(field: string): string {
    let retorno = "";
    if (this.loginControls[field].hasError("required")) {
      retorno = "El campo es requerido.";
    }
    else if (this.loginControls[field].hasError('email')) {
      retorno = "Formato de mail inválido";
    }
    else if (this.loginControls[field].hasError('minlength')) {
      retorno = "La contraseña debe contener 6 caracteres mínimo";
    }
    return retorno;
  }

  isNotValidField(field: string): boolean {
    return (this.loginControls[field].touched && this.loginControls[field].dirty == true);
  }
}
