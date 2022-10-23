import {auth,database,app} from '../../firebase.js';
import {signInWithCustomToken,signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth";
import { async } from '@firebase/util';
//import {  getDocs } from 'firebase/firestore/lite';
import { doc,setDoc,GeoPoint,collection ,getDocs} from 'firebase/firestore';
import {  query, where } from "firebase/firestore";


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

export const getBusinesses = async(req,res) => {
    const owner = req.body.owner;
try {
    const b = collection(database, "business");

    const q = query(b, where("owner", "==", owner));
    const businessquery = await getDocs(q);
    console.log("holsa")


    let businesslist = [];
    businessquery.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        businesslist.push(doc.data());
      });   
      console.log("hh " + businesslist)

res.json(businesslist);
    }
    catch (error) {
      console.log(error)

    }
}