import { auth, database } from '../../firebase.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateEmail,
  updatePassword } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, getDocs, query, collection, where, deleteDoc } from 'firebase/firestore';
import { sendEmailFromBackend } from './userVerification.controller.js'

export const signIn = async (req,res) => {
    const { email, password } = req.params
    if (!isValidEmail(email)) {
      res.status(401)
      res.send("El email no es válido")
      return
    }
    signInWithEmailAndPassword(auth, email,password)
      .then(async (userCredential) => {
        const userRef = doc(database, 'users', auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
    
        if (userSnap.exists()) {
            const user = userSnap.data();
            user.token = userCredential.user.stsTokenManager.accessToken
            user.uid = auth.currentUser.uid
            res.json(user);
        }
          return userCredential
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          
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
  
    const {email,username,usernameForSearch,password,numberphone,isBusinessOwner } = req.body
    if(!checkInputs(email, password, numberphone)) {
      res.status(400)
      res.send({ message: "Todos los campos deben tener contenido"})
      return
    }
    if(!checkPassword(password)) {
      res.status(400)
      res.send({ message: "Contraseña no válida"})
      return
    }
    if(!checkPhoneNumber(numberphone)) {
      res.status(400)
      res.send({ message: "Teléfono no válido"})
      return
    }
    if(!isValidEmail(email)) {
      res.status(400)
      res.send({ message: "El email no es válido"})
      return
    }
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
        // Signed in
    setDoc(doc(database,"users",userCredential.user.uid) ,{
      username: username,
      usernameForSearch: usernameForSearch,
      points : 0,
      followers: [],
      following: [],
      isBusinessOwner : isBusinessOwner,
      subscription: 0,
      numero : numberphone,
      email:email,
      password:password,
      items: {seeds: {}},
    garden: [{type: "noflower", petals: 3, health: 3, fertilizer: new Date(2001, 12, 13, 0, 0, 0)}, {type: "noflower", petals: 3, health: 3, fertilizer: new Date(2001, 12, 13, 0, 0, 0)}, {type: "noflower", petals: 3, health: 3, fertilizer: new Date(2001, 12, 13, 0, 0, 0)}, {type: "noflower", petals: 3, health: 3, fertilizer: new Date(2001, 12, 13, 0, 0, 0)}],
      profileImage : 'testing.png',
      historico : [],
    }
  )


          
        const user = userCredential.user;
        signInWithEmailAndPassword(auth, email,password)
          .then((loggedUser) => {
            sendEmailFromBackend(loggedUser);
            res.status(200);
            res.send(loggedUser);
        })


        
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode=='auth/email-already-in-use'){
          res.status(401);
          res.send('ya existe una cuenta con ese correo');
        } else if(errorCode=='auth/weak-password'){
          res.status(406);
          res.send('la contraseña es demasiado débil');
        }
      else{
          res.status(502);
          res.send('error de de conexion');
      }
        
    });
  };
export const profileUser=async (req, res)=>{
 const {uid,newEmail,newName,newPassword,newPhone,oldEmail,oldPassword}=req.body;
 
 try{
  signInWithEmailAndPassword(auth, oldEmail,oldPassword)
    .then((loggedUser) => {
      updateEmail(loggedUser.user, newEmail).then(() => {
        
      })
      updatePassword(loggedUser.user, newPassword).then(() => {
        
      })

   })
  const userRef = doc(database, 'users', uid); 
  if(newEmail!=''){await updateDoc(userRef, { email: newEmail});}
  if(newPassword!=''){await updateDoc(userRef, { password:newPassword});}
  if(newName!=''){await updateDoc(userRef, { username: newName});}
  if(newPhone!=''){await updateDoc(userRef, { numero:newPhone});}
}catch(err){
  Alert.alert(err)
}

}
export const updateAuthMail = (user) => {
 
    updateEmail(user, newEmail).then(() => {
      
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
    
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if(errorCode=='auth/weak-password'){
      return 406;
    }

  });
}

function isValidEmail(email) {
  return (/\S+@\S+\.\S+/.test(email))
}

function checkInputs (email, password, numerodetelefono) {
    if(email == '' || password == '' || numerodetelefono == '') {
      return false;;
    }
    return true;
}

function checkPhoneNumber(numerodetelefono)  {
  
      return numerodetelefono.length == 9 ;
}

function checkPassword(password) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return re.test(password);
}

export const deleteUser = async (req, res) => {
  const {username, email, password} = req.body
  const q = query(collection(database, "users"), where("username", "==", username))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
        querySnapshot.forEach((document) => {
            deleteDoc(doc(database, "users", document.id))
            signInWithEmailAndPassword(auth, email,password)
              .then(async (userCredential) => {
                console.log('ccc')
                  deleteUser(auth.currentUser)
              })
        })
    }
}