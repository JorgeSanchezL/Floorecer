import { collection, doc, getDoc, getDocs, query, where,updateDoc, increment } from 'firebase/firestore';
import { ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { database, storage } from '../../firebase.js';

export const getAllItemShop = async (req, res) => {

    const querySnapshot = await getDocs(collection(database, "shop"));
    let body = []
    querySnapshot.forEach((doc) => {
        body.push(doc.data())
        console.log(doc.data())
    });
    res.json(body)
}
export const buyItem = async (req, res) => {
    const { uid, name, points } = req.body;
    try {
        const docRef = doc(database, "users", uid);
      await updateDoc(docRef, {[`items.${name}`]: increment(1),points: increment(points)});
    } catch(error) {
        console.log(error)
    }
}

export const getGarden = async (req, res) => {
    const { user } = req.params;

    const userRef = doc(database, 'users', user);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) { res.status(200).json(userSnap.data().garden); }
    else { res.status(404).json(null); }
}

export const getSeeds = async (req, res) => {
    const { user } = req.params;

    const userRef = doc(database, 'users', user);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) { res.status(200).json(userSnap.data().item.seeds); }
    else { res.status(404).json(null); }
}

export const updateSeedAmount = async (req,res)=>{
    const { uuid, name, newAmount } = req.body;
    const userRef = doc(database, 'users', uuid);
    newData = {}
    newData[`item.seeds.${name}`] = newAmount
    await updateDoc(userRef, newData)
}

export const updateGarden = async (req,res)=>{
    const { uuid, garden } = req.body;
    const userRef = doc(database, 'users', uuid);
    newData = {}
    newData['garden'] = garden
    await updateDoc(userRef, newData)
}