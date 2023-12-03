// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-a9755.firebaseapp.com",
  projectId: "estate-a9755",
  storageBucket: "estate-a9755.appspot.com",
  messagingSenderId: "634980757528",
  appId: "1:634980757528:web:9b2c2f818197de098dd36d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);