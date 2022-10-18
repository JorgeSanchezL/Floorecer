import { initializeApp } from 'firebase/app';
import credentials from '../credentials/floorecer-firebase-adminsdk-v4wsr-189d4814f3.json'

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
import { getFirestore } from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  credential: credential.cert(credentials),
  authDomain: 'floorecer.firebaseapp.com',
  databaseURL: 'https://floorecer.eur3.firebaseio.com',
  projectId: 'floorecer',
  storageBucket: 'floorecer.appspot.com',
  messagingSenderId: 'sender-id',
  appId: 'floorecer'
};

let myApp = initializeApp(firebaseConfig);

export default database = getFirestore(app)
