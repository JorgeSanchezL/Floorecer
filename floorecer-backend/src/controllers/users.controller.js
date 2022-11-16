import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { database, storage } from '../../firebase.js';

export const getUser = async (req, res) => {
    const { uuid } = req.params;

    const userRef = doc(database, 'users', uuid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const user = userSnap.data();

        const imageRef = ref(storage, `profiles/${user.profileImage}`);
        const imageURL = await getDownloadURL(imageRef);

        user.profileImage = imageURL;
        res.json(user);
    } else { res.status(404).json({}); }
}

export const deleteProfileImage = async (req, res) => {
    const { uuid } = req.body;

    const userRef = doc(database, 'users', uuid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const user = userSnap.data();

        const imageRef = ref(storage, `profiles/${user.profileImage}`);
        await deleteObject(imageRef);

        res.json({ deleted: true });
    } else { res.status(404).json({
        deleted: false
    }); }
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

    if (userSnap.exists()) { res.status(200).json(userSnap.data().inventory); }
    else { res.status(404).json(null); }
}

export const updateSeedAmount = async (req,res)=>{
    const { uuid, name, newAmount } = req.body;
    const userRef = doc(database, 'users', uuid);
    newData = {}
    newData[`inventory.seeds.${name}`] = newAmount
    await updateDoc(userRef, newData)
}

export const updateGarden = async (req,res)=>{
    const { uuid, garden } = req.body;
    const userRef = doc(database, 'users', uuid);
    newData = {}
    newData['garden'] = garden
    await updateDoc(userRef, newData)
}


export const getActualPlan = async (req,res)=>{
    const { uuid } = req.body;
    console.log('aqui')
    const userRef = doc(database, 'users', uuid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) { res.json(userSnap.data().subscription); }
    else { res.json(null); }
}