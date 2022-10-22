import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { database } from '../../firebase.js';

export const getUser = async (req, res) => {
    const { uuid } = req.params;

    const userRef = doc(database, 'users', uuid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) { res.json(userSnap.data()); }
    else { res.status(404).json({}); }
}

export const searchUser = async (req, res) => {
    const { user } = req.params;

    let body = []

    const q = query(collection(database, "users"), where("usernameForSearch", "array-contains", user))
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