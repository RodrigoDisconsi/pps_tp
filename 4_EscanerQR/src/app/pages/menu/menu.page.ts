import { Component, OnInit} from '@angular/core';
import { ActionSheetController, AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/clases/usuario';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  usuario: Usuario = new Usuario();
  test: Promise<void | Usuario>;
  qrScan: any;
  dataQR: any;
  codigos: string[] = [];
  scaneado:string;


  constructor(public platform: Platform, private router: Router,
    private dataService: DataService,
    // private qrScanner: QRScanner,
    public actionSheetController: ActionSheetController,
    public loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private barcodeScanner: BarcodeScanner) {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.qrScan.unsubscribe();
    });

  }

  async ngOnInit(): Promise<void> {
    this.presentLoading("Cargando datos...");
    await this.cargarDatos();
  }

  async presentLoading(message) {
    const loading = await this.loadingController.create({
      message,
      duration: 2000,
    });

    loading.present();

    console.log('Loading dismissed!');
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      translucent: true,
      header: 'Carga',
      cssClass: 'my-custom-class',

      backdropDismiss: true,
      buttons: [
        {

          text: 'Cargar',
          icon: 'qr-code-outline',
          handler: () => {
            console.log('Cargar por QR');
            this.leerQR();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close-outline',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }


  leerQR() {

    this.barcodeScanner.scan().then(barcodeData => {

      this.scaneado = barcodeData.text;

      if (this.validarCodigo(this.usuario, barcodeData.text)) {
        this.dataService.fetchQR(barcodeData.text)
          .then(snapshot => {
              this.dataQR = snapshot.val();
              if(isNaN(this.dataQR)) return;
              this.usuario.credito += this.dataQR;
              this.usuario.codigos.push(barcodeData.text);

              this.dataService.actualizar(this.usuario)
                .then(() => this.presentLoading("Actualizando..."))
          }
          ).catch(error => { console.log(error) });
        }
        else {
          this.presentAlert("QR Utilizado");
        }
        
    },
      (error) => console.log(error));
    this.codigos = this.usuario.codigos;
  }

  cargarDatos(): Promise<void> {
    return new Promise<void>((resolve,reject) => {
      this.dataService.obtenerLocal()
      .then(data => {
        this.usuario = Object.assign(new Usuario, data);
        resolve();
      })
      .catch(err =>{
        reject(err);
      });
    })
    
  }


  validarCodigo(usuario: Usuario, codigo: string) {
    if (!usuario.codigos.some(aux => aux == codigo) &&
      usuario.rol != 'Administrador') {
      //this.test = `El rol del usuario es : ${this.usuario.rol}`;
      return true;
    }
    else if (usuario.codigos.filter(aux => aux == codigo).length < 2 &&
      usuario.rol == 'Administrador') {
      //this.test = `El rol del usuario es : ${this.usuario.rol}`;
      return true;
    }
    else {
      return false;
    }
  }

  borrarCreditos() {
    this.usuario.credito = 0;
    this.usuario.codigos = ['0'];
    this.dataService.actualizar(this.usuario)
      .then(() => this.presentToast("Crédito reseteado"));
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: message,
      mode: "ios",
      cssClass: 'warning-alert', // Clase CSS para estilo de advertencia
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel', // Opcional: establece el botón como cancelar
          cssClass: 'cancel-button' // Clase CSS para estilo del botón de cancelar
        }
      ]
    });

    await alert.present();
  }

}
