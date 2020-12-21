import firebase from "firebase/app";
import "firebase/firestore";

export const db = firebase
  .initializeApp({
    apiKey: "AIzaSyCGodojEQo87S4DAiUsp3GmsdxvxtuB8Qk",
    authDomain: "fast-learn-18c35.firebaseapp.com",
    projectId: "fast-learn-18c35",
    storageBucket: "fast-learn-18c35.appspot.com",
    messagingSenderId: "186458413201",
    appId: "1:186458413201:web:13e36574ccd8cc56090730"
  })
  .firestore();
