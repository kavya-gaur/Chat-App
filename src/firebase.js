// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBle0wWE65YpcnpwUWOT1QDk990WYbNgZI",
  authDomain: "chat-app-by-kavya.firebaseapp.com",
  projectId: "chat-app-by-kavya",
  storageBucket: "chat-app-by-kavya.appspot.com",
  messagingSenderId: "328384397761",
  appId: "1:328384397761:web:02fae40387c0e79f3f2f40",
};

// Initialize Firebase
var authFlag = true;
export const app = initializeApp(firebaseConfig);
