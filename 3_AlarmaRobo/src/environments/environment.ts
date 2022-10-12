// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyAFi4P8vxtKg_LKeR3fjzFgwdPihHfe15g",
    authDomain: "web-apps---practica.firebaseapp.com",
    databaseURL: "https://web-apps---practica.firebaseio.com",
    projectId: "web-apps---practica",
    storageBucket: "web-apps---practica.appspot.com",
    messagingSenderId: "1035173945210",
    appId: "1:1035173945210:web:8a7d55a54e5d5a66ff80c3"
  },
  perfiles: {
    admin: {
      email: "admin@mail.com",
      pass: "sarasa",
      rol : "Administrador"
    },
    tester: {
      email: "tester@mail.com",
      pass: "sarasa",
      rol : "Tester"
    },
    usuario: {
      email: "usuario@mail.com",
      pass : "sarasa",
      rol : "Usuario"
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
