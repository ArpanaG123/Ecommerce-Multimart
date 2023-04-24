import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDIhD2GGF5hOEAdhtjr1LOVTyHg_QuFUZc",
  authDomain: "ecommerce-app-2da3e.firebaseapp.com",
  projectId: "ecommerce-app-2da3e",
  storageBucket: "ecommerce-app-2da3e.appspot.com",
  messagingSenderId: "884354692811",
  appId: "1:884354692811:web:4acff5b71eb2c90cd00d4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app;