import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/clases/usuario';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: Usuario = new Usuario();
  mensaje: string;
  loginForm:FormGroup;

  constructor(private dataService: DataService,
              public toastController: ToastController, public loadingController: LoadingController,
              private router: Router, private form:FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmitTemplate()
  {
    this.usuario = this.loginForm.value as Usuario;
    if(this.usuario)
    {
      this.dataService.login(this.usuario).then(res => {
        console.log(res)
        this.presentLoading("Cargando datos...");
        this.presentToast("Se ha registrado exitosamente");
        this.router.navigate(['/menu']);
        
      }, error => {
        console.error(error);
        this.presentToast(error.message);
      });
    }
    
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }


  async presentLoading(message) {
    const loading = await this.loadingController.create({
      message,
      duration: 3000,
    });
    await loading.present();

    console.log('Loading dismissed!');
  }

  get loginControls() {
    return this.loginForm.controls;
  }
  
  getErrorMessage(field: string): string {
    let retorno = "";
    if(this.loginControls[field].hasError("required")) {
      retorno = "El campo es requerido.";
    }
    else if(this.loginControls[field].hasError('email')){
      retorno = "Formato de mail inválido";
    }
    else if(this.loginControls[field].hasError('pattern')){
      if((field == 'nombre' || field == 'apellido')){
        retorno = "El campo debe contener solo letras!";
      }
      else{
        retorno = 'Debe contener solo números';
      }
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
