import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@awesome-cordova-plugins/device-motion/ngx';
import { IonSlides } from '@ionic/angular';
import { Imagen } from 'src/app/clases/imagen';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.scss'],
})
export class TarjetasComponent implements OnInit, OnDestroy {
  @Input() titulo = "";
  @Input() imagenes: Imagen[] = [];

  @ViewChild('mySlider')  slides: IonSlides;


  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  password: string;
  deshabilitarBoton: boolean = false;
  ejeX;
  ejeY;
  ejeZ;
  timeStamp;
  deviceRef;
  posicion;
  posicionAnterior = "";
  
  constructor(private deviceMotion: DeviceMotion) 
  { }

  ngOnInit() {
    this.start()
  }

  ngOnDestroy(): void {
    this.stop();
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

        if(this.ejeX > 3 && this.ejeX <= 10)
        {
          this.posicion = "izquierda";
        }

        if(this.ejeX < -3 && this.ejeX >= -10 )
        {
          this.posicion = "derecha";
        }

        if(this.posicion != this.posicionAnterior)
        {
          switch(this.posicion)
          {
            case "vertical" :
              this.slideFirst();
              break;
            case "derecha" :
              this.slideNext();

              break;
            case "izquierda" :
              this.slidePrev();

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

  slideNext(){
    this.slides.slideNext();
  }

  slidePrev(){
    this.slides.slidePrev();
  }

  slideFirst(){
    this.slides.slideTo(this.slideOpts.initialSlide);
  }

}
