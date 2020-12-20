import firebase from "firebase/app";
import "firebase/firestore";

export const db = firebase
  .initializeApp({ projectId: "fast-learn-18c35" })
  .firestore();

db.enablePersistence();
