// src/firebase.js
import { initializeApp } from "firebase/app"; // Importar la función para inicializar la app
import { getDatabase } from "firebase/database"; // Importar la función para obtener la base de datos

// Configuración de Firebase (asegúrate de que los valores sean correctos)
const firebaseConfig = {
  apiKey: "AIzaSyB_fE8A0sx-gG61iP5zQZHyIb8yeTuALMM",
  authDomain: "flancoin-8dac3.firebaseapp.com",
  databaseURL: "https://flancoin-8dac3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "flancoin-8dac3",
  storageBucket: "flancoin-8dac3.appspot.com",
  messagingSenderId: "120944858079",
  appId: "1:120944858079:web:0dfe4f329aa142e2dfea6a",
  measurementId: "G-G1B83XMRTT"
};

// Inicializar Firebase y la base de datos de manera correcta
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Inicializar la base de datos con `getDatabase`

export { database };
