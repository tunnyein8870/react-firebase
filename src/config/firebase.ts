// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, FacebookAuthProvider} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA24M2J2rmrXKiFeLYi3dr5Sk9WIQwYhuI",
  authDomain: "react-course-new-2066c.firebaseapp.com",
  projectId: "react-course-new-2066c",
  storageBucket: "react-course-new-2066c.appspot.com",
  messagingSenderId: "857616065275",
  appId: "1:857616065275:web:97e08f41301dc460fc465e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const gProvider = new GoogleAuthProvider();
export const fProvider = new FacebookAuthProvider();
export const db = getFirestore(app);