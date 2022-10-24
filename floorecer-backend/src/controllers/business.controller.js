import {auth,database,app} from '../../firebase.js';
import {signInWithCustomToken,signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth";
import { async } from '@firebase/util';
import { doc,setDoc,GeoPoint,collection, getDocs,getDoc,updateDoc,query,where } from 'firebase/firestore';

export const newBusiness = async(req,res) => {
    const{owner,name,nif,Address,location,openingHours,category} = req.body

    await setDoc(doc(collection(database,"business")), {
        owner:owner,
        name: name,
        Address: Address,
        NIF: nif,
        location: location,
        openingHours: openingHours,
        active: true,
        category: category,
        promoted: false,
    });
}

export const getAllBusinesses = async (req, res) => {
    const querySnapshot = await getDocs(collection(database, "business"));
    let body = []
    querySnapshot.forEach((doc) => {
      body.push(doc.data())
    });
    res.json(body)
}

export const getAllBusinessesByCategory = async (req, res) => {
    const {category} = req.params
    try {
        const b = collection(database, "business");
    
        const q = query(b, where("category", "==", category));
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

export const getBusinesses = async(req,res) => {
    const owner = req.body.owner;
try {
    const b = collection(database, "business");

    const q = query(b, where("owner", "==", owner));
    const businessquery = await getDocs(q);
    console.log("holsa")


    let businesslist = [];
    businessquery.forEach((doc) => {
        let miarray = doc.data() ;
        miarray.uid = doc.id;

        businesslist.push(miarray );
      });   
      console.log("hh " + businesslist)

res.json(businesslist);
    }
    catch (error) {
      console.log(error)

    }
}

export const promoteBusiness = async (req,res) => {
    const uid=req.body.uid
    try {
        const docRef = doc(database, "business", uid);
      await updateDoc(docRef, { promoted: true});
    } catch(error) {
        console.log(error)
    }
    
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
export const getCategories = async(req,res) => {
    const docSnap = await getDoc(doc(database, "Categories",'Categories'));
    res.json(docSnap.data())

}
