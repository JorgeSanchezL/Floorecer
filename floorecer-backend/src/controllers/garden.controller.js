import { collection, doc, getDoc, getDocs, query, where,updateDoc, increment } from 'firebase/firestore';
import { ref,getDownloadURL } from 'firebase/storage';
import { database, storage } from '../../firebase.js';

export const getAllItemShop = async (req, res) => {

    const querySnapshot = await getDocs(collection(database, "shop"));
    let body = []
    querySnapshot.forEach((doc) => {
        const item=doc.data()
        item.uid=doc.id
        body.push(item)
    });
    
    
    res.json(body)
}
export const buyItem = async (req, res) => {
    const { uid, name, points } = req.body;
    try {
        const docRef = doc(database, "users", uid);
        const docSnap=await getDoc(docRef)
        if(docSnap.data().points>points){
            await updateDoc(docRef, {[`items.seeds.${name}`]: increment(1),points: increment(-points)});
            
            res.json('Compra con exito')
        }else{
            
            res.json('No tiene suficientes puntos')
        }
    } catch(error) {
        console.log('error')
    }
}
export const getItem = async (req, res) => {
    const { uid} = req.params;
    try {
        const docRef = doc(database, "shop", uid)
        const docSnap=await getDoc(docRef)

        const item=docSnap.data()
        var refi = ref(storage,docSnap.data().imageURL)
        const u = await getDownloadURL(refi)
        item.imageURL=u
        res.json(item)
        
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

    if (userSnap.exists()) { res.status(200).json(userSnap.data().item); }
    else { res.status(404).json(null); }
}

export const updateItems = async (req,res)=>{
    const { uuid, inventory } = req.body;
    const userRef = doc(database, 'users', uuid);
    let newData = {}
    newData['item'] = inventory
    await updateDoc(userRef, newData)
}

export const updateGarden = async (req,res)=>{
    const { uuid, garden } = req.body;
    const userRef = doc(database, 'users', uuid);
    let newData = {}
    newData['garden'] = garden
    await updateDoc(userRef, newData)
}