import { AfterContentChecked, Component, OnDestroy, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Usuario } from 'src/app/clases/usuario';
import { DataService } from 'src/app/services/data.service';
import { Router, NavigationEnd } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

import { Observable, interval } from 'rxjs';
import { rejects } from 'assert';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnDestroy, OnInit {
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
    private detector: ChangeDetectorRef,
    private alertController: AlertController,
    private barcodeScanner: BarcodeScanner) {
    console.log("Constructor");

    this.platform.backButton.subscribeWithPriority(0, () => {
      this.qrScan.unsubscribe();
    });

  }

  async ngOnInit(): Promise<void> {
    await this.cargarDatos();
    this.presentLoading("Cargando datos...");

  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }

  async presentLoading(message) {
    const loading = await this.loadingController.create({
      message,
      duration: 3000,
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
              this.usuario.credito += this.dataQR;
              this.usuario.codigos.push(barcodeData.text);

              this.dataService.actualizar(this.usuario)
                .then(() => this.presentLoading("Actualizando..."))
                .finally(() => this.presentToast(`CARGA REALIZADA DE ${this.dataQR}`));
          }
          ).catch(error => { console.log(error) });
        }
        else {
          this.presentAlert("C??DIGO YA UTILIZADO");
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
      usuario.rol != 'admin') {
      //this.test = `El rol del usuario es : ${this.usuario.rol}`;
      return true;
    }
    else if (usuario.codigos.filter(aux => aux == codigo).length < 2 &&
      usuario.rol == 'admin') {
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
      .then(() => this.presentToast("Cr??dito reseteado"));
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
      header: 'Atenci??n',
      message,
    });

    await alert.present();
  }

}
