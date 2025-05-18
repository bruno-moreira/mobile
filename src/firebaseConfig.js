import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO0BXkGxfgAdSc8L6VghJbZR2V2egSS3c",
  authDomain: "driverapptcc.firebaseapp.com",
  projectId: "driverapptcc",
  storageBucket: "driverapptcc.firebasestorage.app",
  messagingSenderId: "80766776128",
  appId: "1:80766776128:web:a46aa94bdf7eb64b1880a5"
};

const app = initializeApp(firebaseConfig);

// Inicializa o auth com persistência no AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };