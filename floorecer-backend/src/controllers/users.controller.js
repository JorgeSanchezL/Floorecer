import { doc, getDoc } from 'firebase/firestore';
import { database } from '../../firebase.js';

export const getUser = async (req, res) => {
    const { uuid } = req.params;

    const userRef = doc(database, 'users', uuid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) { res.json(userSnap.data()); }
    else { res.status(404).json({}); }
}