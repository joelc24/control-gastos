// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKT_6iEtG2Ob_soPaPj6tLtc230lc0IG0",
  authDomain: "control-gastos-ee832.firebaseapp.com",
  projectId: "control-gastos-ee832",
  storageBucket: "control-gastos-ee832.appspot.com",
  messagingSenderId: "361976668341",
  appId: "1:361976668341:web:9b130be933bf0c04c55efc"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)