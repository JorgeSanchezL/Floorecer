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
    