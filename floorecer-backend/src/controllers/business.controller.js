import {auth,database,app} from '../../firebase.js';
import {signInWithCustomToken,signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth";
import { async } from '@firebase/util';
import {  getDocs } from 'firebase/firestore/lite';
import { doc,setDoc,GeoPoint,collection, getDoc,updateDoc } from 'firebase/firestore';

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
export const getBusiness = async(req,res) => {
    console.log("get business")
    console.log(req.body)
    try {
        const docRef = doc(database, "business", "VWFVMwQ5Q2gxpRENlPbS");
        console.log(JSON.stringify(docRef))
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            res.json(docSnap.data())
        } else {
            console.log("No such document!");
            res.json(null)
        }
    } catch(error) {
        console.log(error)
    }
    
}

export const updateBusiness = async (req, res) => {
    const { uid, body } = req.body;

    try {
        const docRef = doc(database, 'business', uid);
        await updateDoc(docRef, body);
        res.json({saved: true});
    } catch (e) { 
        res.status(500).json({saved: false});
    }
}