import AWS from 'aws-sdk';
import Randomatic from 'randomatic'
import { database } from '../../firebase.js'
import { collection, query, where, getDocs } from "firebase/firestore";

AWS.config.update({ "accessKeyId": "AKIAYWWUAEJTCXGCC2WP", "secretAccessKey": "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", "region": "eu-west-3" })
const client = new AWS.DynamoDB.DocumentClient();

export const checkUserVerified = async (user, req, res) => {
    const citiesRef = collection(database, "user")
    const q = query(citiesRef, where("user_id", "==", user))

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        if (doc.data().verified == true) {
            res.json(true)
            return
        }
    });

}

export const verifyCode = async (user, code, req, res) => {
    const citiesRef = collection(database, "verify-code")
    const q = query(citiesRef, where("user_id", "==", user))

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        if (doc.data().code == code) {
            res.json(true)
            return
        }
    });
}

export const updateVerifyCode = async (user, req, res) => {
    const params = {
        TableName: 'verify-code',
        Key: {
            'user_id': user,
          },
          ExpressionAttributeValues: {
            'code': Randomatic.randomize('000000')
          },
    };

    try {
        const data = await ddbDocClient.send(new UpdateCommand(params));
        console.log("Success - item added or updated", data);
        return data;
      } catch (err) {
        console.log("Error", err);
      }
}

export const sendEmail = async (mail) => {
    try{
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
              user: testAccount.user,
              pass: testAccount.pass,
            },
        })

        let info = await transporter.sendMail({
            from: '"Floorecer" <info@floorecer.com>',
            to: mail,
            subject: "Verifica tu correo electrónico",
            text: "Para poder utilizar Floorecer debes verificar tu cuenta. Para ello introduce el código recibido en tu correo electrónico"
        })
    } catch (err) {
        console.log(err)
    }
}