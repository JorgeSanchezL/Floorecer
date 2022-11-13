import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { database, storage } from '../../firebase.js';

export const getUser = async (req, res) => {
    const { uuid } = req.params;

    const userRef = doc(database, 'users', uuid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const user = userSnap.data();

        const imageRef = ref(storage, "profiles/"+user.profileImage);
        const imageURL = await getDownloadURL(imageRef);

        user.profileImage = imageURL;
        res.json(user);
    } else { res.status(404).json({}); }
}
export const getAllUser = async (req, res) => {

    const querySnapshot = await getDocs(collection(database, "users"));
    let body = []
    querySnapshot.forEach((doc) => {
        body.push(doc.data())
        console.log(doc.data())
    });
    res.json(body)
}

export const searchUser = async (req, res) => {
    const { contains } = req.params;

    let body = []

    const q = query(collection(database, "users"), where("usernameForSearch", "array-contains", contains))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            body.push(doc.data())
        })
        res.status(200).json(body)
    } else {
        res.status(404).json({})
    }
}


export const getActualPlan = async (req,res)=>{
    const { uuid } = req.body;
    console.log('aqui')
    const userRef = doc(database, 'users', uuid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) { res.json(userSnap.data().subscription); }
    else { res.json(null); }
}

export const getUsersByIds = async (req, res) => {
    try{
        const { ids } = req.body;

        const body = await getUsers(ids)
        if(!body.length===0)res.json(JSON.stringify(body))
    }catch(err){
        console.log(err)
    }
}

const getUsers = async(ids) => {
    let body = []
    ids.forEach(async (id)=>{
        const userRef = doc(database, 'users', id);
        const userSnap = await getDoc(userRef);
        if (!userSnap.empty) {
            body.push({owner:id,data:userSnap.data()})
            console.log(body)
        } 
    })
    return body
}