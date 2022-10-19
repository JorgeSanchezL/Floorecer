// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
//import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkdt3kX7UJjmUPPeG-us__QFUfwGkIbRI",
  authDomain: "floorecer.firebaseapp.com",
  projectId: "floorecer",
  storageBucket: "floorecer.appspot.com",
  messagingSenderId: "736288377672",
  appId: "1:736288377672:web:3d9d2f671da1476b77817d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
//const auth = auth();

//xport{auth};