// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBlpa_KNpCM2gW3x7CU92prqCm1P6UeTcc",
    authDomain: "tps-pps.firebaseapp.com",
    databaseURL: "https://tps-pps-default-rtdb.firebaseio.com",
    projectId: "tps-pps",
    storageBucket: "tps-pps.appspot.com",
    messagingSenderId: "370063651241",
    appId: "1:370063651241:web:648d9dd8a8f0d6a71ad4b8"
  },
  usuario: {
    admin: {
      email: "admin@mail.com",
      pass: "123456",
      rol : "Administrador"
    },
    tester: {
      email: "tester@mail.com",
      pass: "123456",
      rol : "Tester"
    },
    usuario: {
      email: "usuario@mail.com",
      pass : "123456",
      rol : "Usuario"
    }
  },
  numeros : 
  [
    {
      nombre: "0",
      img: "/assets/img/0-2x.svg",
      audio_es: "assets/audio/cero_es.mp3",
      audio_en: "assets/audio/0_en.mp3",
      audio_pt: "assets/audio/0_pt.mp3"
    },
    {
      nombre: "1",
      img: "/assets/img/1-2x.svg",
      audio_es: "assets/audio/uno_es.mp3",
      audio_en: "assets/audio/1_en.mp3",
      audio_pt: "assets/audio/1_pt.mp3"
    },
    {
      nombre: "2",
      img: "/assets/img/2-2x.svg",
      audio_es: "assets/audio/dos_es.mp3",
      audio_en: "assets/audio/2_en.mp3",
      audio_pt: "assets/audio/2_pt.mp3"
    },
    {
      nombre: "3",
      img: "/assets/img/3-2x.svg",
      audio_es: "assets/audio/tres_es.mp3",
      audio_en: "assets/audio/3_en.mp3",
      audio_pt: "assets/audio/3_pt.mp3"
    },
    {
      nombre: "4",
      img: "/assets/img/4-2x.svg",
      audio_es: "assets/audio/cuatro_es.mp3",
      audio_en: "assets/audio/4_en.mp3",
      audio_pt: "assets/audio/4_pt.mp3"
    },
    {
      nombre: "5",
      img: "/assets/img/5-2x.svg",
      audio_es: "assets/audio/cinco_es.mp3",
      audio_en: "assets/audio/5_en.mp3",
      audio_pt: "assets/audio/5_pt.mp3"
    },
    {
      nombre: "6",
      img: "/assets/img/6-2x.svg",
      audio_es: "assets/audio/seis_es.mp3",
      audio_en: "assets/audio/6_en.mp3",
      audio_pt: "assets/audio/6_pt.mp3"
    },
    {
      nombre: "7",
      img: "/assets/img/7-2x.svg",
      audio_es: "assets/audio/siete_es.mp3",
      audio_en: "assets/audio/7_en.mp3",
      audio_pt: "assets/audio/7_pt.mp3"
    },
    {
      nombre: "8",
      img: "/assets/img/8-2x.svg",
      audio_es: "assets/audio/ocho_es.mp3",
      audio_en: "assets/audio/8_en.mp3",
      audio_pt: "assets/audio/8_pt.mp3"
    },
    {
      nombre: "9",
      img: "/assets/img/9-2x.svg",
      audio_es: "assets/audio/nueve_es.mp3",
      audio_en: "assets/audio/9_en.mp3",
      audio_pt: "assets/audio/9_pt.mp3"
    },
    {
      nombre: "10",
      img: "/assets/img/10-2x.svg",
      audio_es: "assets/audio/diez_es.mp3",
      audio_en: "assets/audio/10_en.mp3",
      audio_pt: "assets/audio/10_pt.mp3"
    },
  ],
  colores : 
  [
    {
      nombre: "Rojo",
      img: "/assets/img/rojo.svg",
      audio_es: "assets/audio/rojo_es.mp3",
      audio_en: "assets/audio/rojo_en.mp3",
      audio_pt: "assets/audio/rojo_pt.mp3"
    },
    {
      nombre: "Azul",
      img: "/assets/img/azul.svg",
      audio_es: "assets/audio/azul_es.mp3",
      audio_en: "assets/audio/azul_en.mp3",
      audio_pt: "assets/audio/azul_pt.mp3"
    },
    {
      nombre: "Amarillo",
      img: "/assets/img/amarillo.svg",
      audio_es: "assets/audio/amarillo_es.mp3",
      audio_en: "assets/audio/amarillo_en.mp3",
      audio_pt: "assets/audio/amarillo_pt.mp3"
    },
    {
      nombre: "Verde",
      img: "/assets/img/verde.svg",
      audio_es: "assets/audio/verde_es.mp3",
      audio_en: "assets/audio/verde_en.mp3",
      audio_pt: "assets/audio/verde_pt.mp3"
    },
    {
      nombre: "Blanco",
      img: "/assets/img/blanco.svg",
      audio_es: "assets/audio/blanco_es.mp3",
      audio_en: "assets/audio/blanco_en.mp3",
      audio_pt: "assets/audio/blanco_pt.mp3"
    },
    {
      nombre: "Negro",
      img: "/assets/img/negro.svg",
      audio_es: "assets/audio/negro_es.mp3",
      audio_en: "assets/audio/negro_en.mp3",
      audio_pt: "assets/audio/negro_pt.mp3"
    },
  ],
  animales: 
  [
    {
      nombre: "Perro",
      img: "/assets/img/perro.jpg",
      audio_es: "assets/audio/perro_es.mp3",
      audio_en: "assets/audio/perro_en.mp3",
      audio_pt: "assets/audio/perro_pt.mp3"
    },
    {
      nombre: "Gato",
      img: "/assets/img/gato.jpg",
      audio_es: "assets/audio/gato_es.mp3",
      audio_en: "assets/audio/gato_en.mp3",
      audio_pt: "assets/audio/gato_pt.mp3"
    },
    {
      nombre: "Oso",
      img: "/assets/img/oso.jpg",
      audio_es: "assets/audio/oso_es.mp3",
      audio_en: "assets/audio/oso_en.mp3",
      audio_pt: "assets/audio/oso_pt.mp3"
    },
    {
      nombre: "Pato",
      img: "/assets/img/pato.jpg",
      audio_es: "assets/audio/pato_es.mp3",
      audio_en: "assets/audio/pato_en.mp3",
      audio_pt: "assets/audio/pato_pt.mp3"
    },
    {
      nombre: "Elefante",
      img: "/assets/img/elefante.jpg",
      audio_es: "assets/audio/elefante_es.mp3",
      audio_en: "assets/audio/elefante_en.mp3",
      audio_pt: "assets/audio/elefante_pt.mp3"
    }
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
