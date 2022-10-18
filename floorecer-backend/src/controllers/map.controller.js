import AWS from 'aws-sdk';
import database from '../../firebase.js'
import { collection, getDocs } from "firebase/firestore";

export const getAllPOI = async (req, res) => {

    const querySnapshot = await getDocs(collection(database, "POI"));
    let body = []
    querySnapshot.forEach((doc) => {
      body.push(doc.data())
    });
    res.json(body)
}