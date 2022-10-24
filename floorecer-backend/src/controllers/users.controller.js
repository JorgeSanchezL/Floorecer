import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { database } from '../../firebase.js';

export const getUser = async (req, res) => {
    const { uuid } = req.params;

    const userRef = doc(database, 'users', uuid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) { res.json(userSnap.data()); }
    else { res.status(404).json({}); }
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