import {auth} from '../../firebase.js';
import {signInWithCustomToken,signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth";
import { async } from '@firebase/util';

export const signIn = async (req,res) => {
    const {email, password } = req.body
    signInWithEmailAndPassword(auth, email,password)
    .then((userCredential) => {
        // Signed in
        console.log('eg')
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
  };
export const register = async (req,res) => {
    const {email, password } = req.body
    createUserWithEmailAndPassword(auth, 'sasda@upv.es','123456')
    .then((userCredential) => {
        // Signed in
        console.log('re')
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
  };



{/*signInWithCustomToken(auth, token)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });*/}