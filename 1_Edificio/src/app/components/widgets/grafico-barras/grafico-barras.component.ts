import { Component, OnInit } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { Chart } from 'angular-highcharts';
import { Imagen } from 'src/app/clases/imagen';
import { ImagenService } from 'src/app/services/imagen.service';

interface Serie {
  name: string,
  data: any,
}

enum Dia {
  Domingo,
  Lunes,
  Martes,
  Miercoles,
  Jueves,
  Viernes,
  Sabado
}

@Component({
  selector: 'app-grafico-barras',
  templateUrl: './grafico-barras.component.html',
  styleUrls: ['./grafico-barras.component.scss'],
})
export class GraficoBarrasComponent implements OnInit {
  public highchart;
  public data;
  public chartOptions;
  public fotos: Imagen[];
  public semana: Dia[] = [Dia.Domingo,Dia.Lunes, Dia.Martes, Dia.Miercoles, Dia.Jueves, 
                Dia.Viernes, Dia.Sabado ];
  public assets: string[] = [];

  constructor() {
    
  }

  ngOnInit() 
  {
    this.fotos = ImagenService.fotosFeas;
    if(this.fotos)
    {
      this.procesarDatos();   
      this.crearGrafico(this.assets);
    }
  }

  procesarDatos() 
  {
    let votosPorDia = [];

    this.semana.forEach(dia => 
    {
      let imgSrc = "";
      let mayorVotos = 0;
      let auxiliar;

      this.fotos.forEach(foto => 
      {
        let votoActual = 0;
        if(foto.votos){
          foto.votos.forEach(voto => {
            const fecha = new Date(voto.fecha);
            if (fecha.getDay() == dia) 
            {
              votoActual++;
              if (votoActual > mayorVotos) 
              {
                mayorVotos = votoActual;
                imgSrc = foto.url;
                auxiliar = {
                  name: fecha.getDate() + '/' + fecha.getMonth() + '/' + fecha.getFullYear(),
                  y: mayorVotos
                };
              }
            }
          });
        }
      });
      if(auxiliar)
      {
        this.assets.push(imgSrc);
        votosPorDia.push(auxiliar);
      }

    });
    
    this.data = votosPorDia;
    console.log(this.data);
  }

  crearGrafico(imagenes: string[])
  {
    this.highchart = new Chart( {
      chart: {
        height: 400,
        width: 400,
        marginTop: 40,
         type: 'column'
      },
      title: {
        text: '',
      },
      subtitle: {
        text: 'Mayor cantidad de votos por día'
      },
      credits: {
         enabled: false
      },
      xAxis: {
         categories: ['Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
         crosshair: true
      },
      yAxis: {
         min: 0,
         title: {
            text: 'Cantidad de votos'
         }
      },
      tooltip: {
        useHTML: true,
        shape: "square",
        borderRadius: 15,
        formatter: function() {
          console.log(this);
          var img = '<span>Foto con mayor cantidad de votos:'+ this.y +'</span><br>'+
                    '<p><img src='+imagenes[this.colorIndex]+
                    ' width="300" height="150"></p>';

          return img;
        }
      },
      series: [
      {
        type: 'column',
        name: "",
        colorByPoint: true,
        data: this.data
      }]
   });
  }

  

}
