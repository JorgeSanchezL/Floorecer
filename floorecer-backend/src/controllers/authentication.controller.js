import {auth,database,app} from '../../firebase.js';
import {signInWithCustomToken,signInWithEmailAndPassword,createUserWithEmailAndPassword,updateEmail,updatePassword} from "firebase/auth";
import { async } from '@firebase/util';
import { collection, getDocs } from 'firebase/firestore/lite';
import { doc,setDoc ,updateDoc} from 'firebase/firestore';
import { sendEmailFromBackend } from './userVerification.controller.js'
export const signIn = async (req,res) => {
    const {email, password } = req.params
    signInWithEmailAndPassword(auth, email,password)
    .then((userCredential) => {
        // Signed in
        console.log('eg')
        const user = userCredential.user;
        res.status(200);
        res.send(auth.currentUser);
        return userCredential
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
  console.log("hola")
    const {email,username,usernameForSearch,password,numberphone,isBusinessOwner } = req.body
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
        // Signed in
    setDoc(doc(database,"users",userCredential.user.uid) ,{
    username: username,
    //usernameForSearch: usernameForSearch,
    points : 0,
    followers : {},
    following : {},
    isBusinessOwner : isBusinessOwner,
    numero : numberphone,
    email:email,
    password:password
    }
  )


          console.log('re')
        const user = userCredential.user;
        signInWithEmailAndPassword(auth, email,password)
          .then((loggedUser) => {
            sendEmailFromBackend(loggedUser);
        })
        res.status(200);
        res.send(auth.currentUser); //Cambiado para la UT de verificar usuario :)


        
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode=='auth/email-already-in-use'){
          res.status(401);
          res.send('ya existe una cuenta con ese correo');

          console.log(errorCode)
        } else if(errorCode=='auth/weak-password'){
          res.status(406);
          res.send('la contraseña es demasiado débil');

          console.log(errorCode)
        }
      else{
          res.status(502);
          res.send('error de de conexion');

          console.log(errorCode);

      }
        
    });
  };
export const profileUser=async (req, res)=>{
 const {newEmail,newName,newPassword,newPhone,oldEmail,oldPassword}=req.body;
 console.log(newEmail+''+ newPassword+''+newPhone);
 try{
  signInWithEmailAndPassword(auth, oldEmail,oldPassword)
    .then((loggedUser) => {
      updateEmail(loggedUser.user, newEmail).then(() => {
        console.log('email act')
      })
      updatePassword(loggedUser.user, newPassword).then(() => {
        console.log('contra act')
      })

   })
  
  const uid='gPASbD6K2bOwU3dK3SpqwlG8Rhl2';
  const userRef = doc(database, 'users', uid); 
  if(newEmail!=''){await updateDoc(userRef, { email: newEmail});}
  if(newPassword!=''){await updateDoc(userRef, { password:newPassword});}
  if(newName!=''){await updateDoc(userRef, { username: newName});}
  if(newPhone!=''){await updateDoc(userRef, { numero:newPhone});}
}catch(err){
  console.log(err)
}

}
export const updateAuthMail = (user) => {
 
    updateEmail(user, newEmail).then(() => {
      console.log('email act')
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if(errorCode=='auth/email-already-in-use'){
        return 401;
      }
    });
}
export const updateAuthPass = (user) => {
 
  updatePassword(user, newPassword).then(() => {
    console.log('contra act')
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if(errorCode=='auth/weak-password'){
      return 406;
    }

  });
}