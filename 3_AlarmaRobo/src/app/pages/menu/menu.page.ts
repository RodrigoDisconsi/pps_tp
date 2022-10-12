import { Component, OnInit } from '@angular/core';

// Plugins
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { Sensors, TYPE_SENSOR } from '@ionic-native/sensors/ngx';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';

import { AlertController, Platform } from '@ionic/angular';

import { DataService } from 'src/app/services/data.service';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  password: string;
  deshabilitarBoton: boolean = false;
  estado: Estado = Estado.DESACTIVADA;
  ejeX;
  ejeY;
  ejeZ;
  timeStamp;
  options: GyroscopeOptions = {
    frequency: 1000
  } 
  deviceRef;
  posicion;
  posicionAnterior = "";
  
  constructor(private platform: Platform, private deviceMotion: DeviceMotion, 
              private flashlight: Flashlight, private vibration: Vibration,   
              private dataService: DataService, private audioService: AudioService,
              private alertController: AlertController) 
  {   
    this.platform.ready().then(() => {
      this.audioService.preload('derecha','assets/audio/derecha.mp3');
      this.audioService.preload('izquierda','assets/audio/izquierda.mp3');
      this.audioService.preload('vertical','assets/audio/vertical.mp3');
      this.audioService.preload('horizontal','assets/audio/horizontal.mp3');
     
    });
  }

  ngOnInit() {
  }

  activarAlarma()
  {
    this.estado = Estado.ACTIVADA;
    this.deshabilitarBoton = true;

    console.log('Estado --------------------------------------------',this.estado);

    this.start();
    this.presentAlert("Alarma activada");
  }

  desactivarAlarma()
  {
    this.dataService.obtenerLocal()
        .then(usuario => {

          usuario.pass = this.password;
          this.dataService.login(usuario)
              .then( res => {
                console.log(res);
                this.estado = Estado.DESACTIVADA;
                this.deshabilitarBoton = false;
                this.stop();
                this.presentAlert("Alarma desactivada");
              })
        });
  }

  start()
  {
    try
    {
      let option: DeviceMotionAccelerometerOptions = 
      {
        frequency: 500
      };

      this.deviceRef = this.deviceMotion.watchAcceleration(option)
      .subscribe((acc: DeviceMotionAccelerationData) => {
        this.ejeX = "" + acc.x;
        this.ejeY = "" + acc.y;
        this.ejeZ = "" + acc.z;
        this.timeStamp = "" + acc.timestamp;


        if(this.ejeX > 1 && this.ejeX <= 9)
        {
          console.log("IZQUIERDA");
          this.posicion = "izquierda";
        }

        if(this.ejeX < -1 && this.ejeX >= -9 )
        {
          console.log("DERECHA");
          this.posicion = "derecha";
        }

        if(this.ejeX > 8 && this.ejeX <= 11 || this.ejeX < -8 && this.ejeX >= -11)
        {   
          console.log("HORIZONTAL");
          this.posicion = "horizontal";
        }

        if(this.ejeX <= 2 && this.ejeX >= -2 || this.ejeX == 0 || this.ejeX == -0)
        {
          console.log("VERTICAL");
          this.posicion = "vertical";  
        } 

        if(this.posicion != this.posicionAnterior)
        {
          switch(this.posicion)
          {
            case "vertical" :

              this.audioService.play('vertical');
              this.flashlight.switchOff();
              setTimeout(() => {
                this.flashlight.switchOn();
              }, 5000);
              this.flashlight.switchOff();
              this.posicionAnterior = this.posicion;

              break;
            case "horizontal" :

              this.vibration.vibrate(5000);
              this.audioService.play('horizontal');
              this.posicionAnterior = this.posicion;

              break;
            case "derecha" :

              this.audioService.play('derecha');
              this.posicionAnterior = this.posicion;

              break;
            case "izquierda" :

              this.audioService.play('izquierda');
              this.posicionAnterior = this.posicion;

              break;
          }
        }
       

      });
    }
    catch(error)
    {
      console.error("ERROR: ",error);
    }
  }

  stop()
  {
    this.deviceRef.unsubscribe();
  }

  async presentAlert(message) 
  {
    const alert = await this.alertController.create({
      header: 'Atención',
      message,
      mode: "ios",
      translucent: true
    });
  
    await alert.present();
  }

}

enum Estado{
  ACTIVADA = 1,
  DESACTIVADA = 0
}