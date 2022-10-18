import AWS from 'aws-sdk';
import database from '../../firebase.js'
import { collection, query, where, getDocs } from "firebase/firestore";

AWS.config.update({ "accessKeyId": "AKIAYWWUAEJTCXGCC2WP", "secretAccessKey": "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", "region": "eu-west-3" })
const client = new AWS.DynamoDB.DocumentClient();

export const getAllPOI = async (req, res) => {
    /*const params = {
        TableName: 'POI'
    };

    client.scan(params, (err, data) => {
        if (err) { res.status(404).json(err); }
        else { res.json(data.Items); }
    });*/
    const q = query(collection(db, "POI"), where(true));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      return doc.data();
    });
}