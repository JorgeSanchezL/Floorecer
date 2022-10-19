import {auth} from '../../firebase.js';
import {signInWithCustomToken,signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth";
import { async } from '@firebase/util';

export const signIn = async (req,res) => {
    const {email, password } = req.params
    signInWithEmailAndPassword(auth, email,password)
    .then((userCredential) => {
        // Signed in
        console.log('eg')
        const user = userCredential.user;
        res.status(200);
        res.send(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage)
        if(errorCode=='auth/wrong-password'){
            res.status(401);
            res.send('La contraseña es incorrecta');
        }else if(errorCode=='auth/user-not-found'){
            res.status(401);
            res.send('No existe el usuario');
        }
        else{
            res.status(502);
            res.send('El servidor no está disponible');
        }
        
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