// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseOptions } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBNiS8Tx7fiG4aWvo4XCoRSw1jNj6iMyW8",
  authDomain: "pistol-44e79.firebaseapp.com",
  databaseURL: "https://pistol-44e79-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pistol-44e79",
  storageBucket: "pistol-44e79.appspot.com",
  messagingSenderId: "787656565309",
  appId: "1:787656565309:web:f291bde06163158cde8054",
  measurementId: "G-6KQGXGTJ10"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
