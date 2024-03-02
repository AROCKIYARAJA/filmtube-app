// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB-3VYZ2CpVSpAuDhr87zBuFGC_hSwisZY",
  authDomain: "filmtube-app.firebaseapp.com",
  projectId: "filmtube-app",
  storageBucket: "filmtube-app.appspot.com",
  messagingSenderId: "500498324272",
  appId: "1:500498324272:web:49c0e90654c9d4900b46f5",
};

const app = initializeApp(firebaseConfig);
export const AUTH = getAuth(app);
export const GoogleAccount = new GoogleAuthProvider();
export const STORAGE = getFirestore(app);
export const DOCSTORAGE = getStorage(app); 
