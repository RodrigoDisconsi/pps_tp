import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/clases/usuario';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nombre: string;
  usuario: Usuario = new Usuario();
  pattern = "^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$";
  mensaje: string;
  loginForm: FormGroup;

  constructor(public toastController: ToastController, private dataService: DataService, private form:FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get loginControls() {
    return this.loginForm.controls;
  }

  onSubmitTemplate() {
    console.log('Form submit');
    this.usuario = this.loginForm.value as Usuario;

    this.dataService.login(this.usuario)
                    .then(res => {
                      console.log(res);
                      this.mensaje = "Login correcto";
                    }, 
                    error => {
                      console.error(error);
                      this.mensaje = "Login denegado";
                    })
                    .finally(() => this.presentToast());

    this.usuario = new Usuario();
    console.log(this.dataService.gerUserDetail());
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.mensaje,
      duration: 2000
    });
    toast.present();
  }

  getErrorMessage(field: string): string {
    let retorno = "";
    if(this.loginControls[field].hasError("required")) {
      retorno = "El campo es requerido.";
    }
    else if(this.loginControls[field].hasError('email')){
      retorno = "Formato de mail inválido";
    }
    else if(this.loginControls[field].hasError('minlength')){
      retorno = "La contraseña debe contener 6 caracteres mínimo";
    }
    return retorno;
  }

  isNotValidField(field: string): boolean {
    return (this.loginControls[field].touched && this.loginControls[field].dirty == true);
  }
}
