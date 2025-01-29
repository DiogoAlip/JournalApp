// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-M71aE0srTENIYzv7JMuDSY8V8y9JV3g",
  authDomain: "journal-redux-dd47e.firebaseapp.com",
  projectId: "journal-redux-dd47e",
  storageBucket: "journal-redux-dd47e.firebasestorage.app",
  messagingSenderId: "1033026298285",
  appId: "1:1033026298285:web:0afab09afdbffc1bff8124",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
