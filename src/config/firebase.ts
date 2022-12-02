// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdHL4M2CvydQTt8DlgKNff01bjEQwU4ZU",
  authDomain: "socialmedia-app-89b93.firebaseapp.com",
  projectId: "socialmedia-app-89b93",
  storageBucket: "socialmedia-app-89b93.appspot.com",
  messagingSenderId: "559885514195",
  appId: "1:559885514195:web:72908cf47095278b4feb26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const provider=new GoogleAuthProvider()
export const db=getFirestore(app)