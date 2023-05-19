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
  perfil: {
    admin: {
      email: "admin@admin.com",
      pass: "123456",
      rol : "Administrador"
    },
    tester: {
      email: "tester@tester.com",
      pass: "123456",
      rol : "Tester"
    },
    usuario: {
      email: "usuario@usuario.com",
      pass : "123456",
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
