import { doc, updateDoc } from 'firebase/firestore';
import { database } from '../../firebase.js';

export const makePayment = async (req, res) => {
    const { uid, subsType } = req.body;

    try {
        const userRef = doc(database, 'users', uid);
        await updateDoc(userRef, {
            subscription: subsType
        });
        res.json({payed: true});
    } catch (e) { res.status(500)
        .json({payed: false}); }
}