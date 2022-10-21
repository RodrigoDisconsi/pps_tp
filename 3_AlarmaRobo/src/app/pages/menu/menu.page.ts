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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
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
  passwordForm: FormGroup;
  isSubmitted:boolean = false;
  
  constructor(private platform: Platform, private deviceMotion: DeviceMotion, 
              private flashlight: Flashlight, private vibration: Vibration,   
              private dataService: DataService, private audioService: AudioService,
              private alertController: AlertController, public formBuilder:FormBuilder) 
  {   
    this.platform.ready().then(() => {
      this.audioService.preload('derecha','assets/audio/derecha.mp3');
      this.audioService.preload('izquierda','assets/audio/izquierda.mp3');
      this.audioService.preload('vertical','assets/audio/heylisten.mp3');
      this.audioService.preload('horizontal','assets/audio/heylisten.mp3');
     
    });
  }

  get errorControl() {
    return this.passwordForm.controls;
  }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
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
    this.isSubmitted = true;
    this.dataService.obtenerLocal()
        .then(usuario => {

          usuario.pass = this.passwordForm.get('password').value;
          this.dataService.login(usuario)
              .then( res => {
                console.log(res);
                this.estado = Estado.DESACTIVADA;
                this.deshabilitarBoton = false;
                this.stop();
                this.presentAlert("Alarma desactivada");
              }).catch(e => {
                this.presentAlert("Error al corroborar contraseña");
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
        this.ejeX = "" + parseInt(acc.x.toString()).toFixed(2).toString();
        this.ejeY = "" + parseInt(acc.y.toString()).toFixed(2).toString();
        this.ejeZ = "" + parseInt(acc.z.toString()).toFixed(2).toString();
        this.timeStamp = "" + acc.timestamp;

        if(this.ejeZ <= 10 && this.ejeZ >= 8 && this.ejeY >= -2 && this.ejeY <= 2)
        {   
          this.posicion = "horizontal";
        }

        if((this.ejeZ <= 4 && this.ejeZ >= -2 && this.ejeY <= 9 && this.ejeY >= 7))
        {
          console.log("VERTICAL");
          this.posicion = "vertical";  
        } 

        if(this.ejeX > 6 && this.ejeX <= 10)
        {
          this.posicion = "izquierda";
        }

        if(this.ejeX < -6 && this.ejeX >= -10 )
        {
          this.posicion = "derecha";
        }

        if(this.posicion != this.posicionAnterior)
        {
          switch(this.posicion)
          {
            case "vertical" :

              this.audioService.play('vertical');
              this.flashlight.switchOn();
              setTimeout(() => {
                this.flashlight.switchOff();
              }, 5000);
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