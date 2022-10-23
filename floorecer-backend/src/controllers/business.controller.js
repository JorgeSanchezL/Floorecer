import {auth,database,app} from '../../firebase.js';
import {signInWithCustomToken,signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth";
import { async } from '@firebase/util';
import {  getDocs } from 'firebase/firestore/lite';
import { doc,setDoc,GeoPoint,collection } from 'firebase/firestore';

export const newBusiness = async(req,res) => {
    const{owner,name,nif,direction,latitude,longitude,openingHours,category} = req.body

    await setDoc(doc(collection(database,"business")), {
        owner:owner,
        name: name,
        direction: direction,
        NIF: nif,
        location: new GeoPoint(latitude, longitude),
        openingHours: openingHours,
        state: 'Activo',
        category: category,
    });

}