import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/clases/usuario';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  perfiles = environment.perfil;
  usuario: Usuario = new Usuario();
  rol: string = "";
  imgSrc = "../../../assets/img/icon.png";
  loginForm: FormGroup;
  selectedUser: boolean = false;

  constructor(public alertCtrl: AlertController, 
              private dataService: DataService,
              public toastController: ToastController,
              private router: Router,
              private form: FormBuilder) 
  {}

  ngOnInit(): void {
    this.loginForm = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  
  iniciarSesion(valor)
  {

    this.rol = valor;
    this.usuario.email = this.perfiles[valor].email;
    this.usuario.pass = this.perfiles[valor].pass;
    this.usuario.rol = this.perfiles[valor].rol;
    this.loginControls.email.setValue(this.usuario.email);
    this.loginControls.pass.setValue(this.usuario.pass);

    this.selectedUser = true;
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
          this.presentToast("Credenciales inválidas")
        });

    this.usuario = new Usuario();
    console.log(this.dataService.gerUserDetail());
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  getErrorMessage(field: string): string {
    let retorno = "";
    if (this.loginControls[field].hasError("required")) {
      retorno = "El campo es requerido.";
    }
    else if (this.loginControls[field].hasError('email')) {
      retorno = "Formato inválido";
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
