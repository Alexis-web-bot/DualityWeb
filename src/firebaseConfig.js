import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAd0tgWz3cwEyhcM-XlfDiw86GkZcTP02I",
  authDomain: "duality-424bc.firebaseapp.com",
  projectId: "duality-424bc",
  storageBucket: "duality-424bc.firebasestorage.app",
  messagingSenderId: "44135970277",
  appId: "1:44135970277:web:8ab7033d38682a3c7b2b0c",
  measurementId: "G-3G6MX5CSDN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  doc,
  setDoc,
  getDoc
};