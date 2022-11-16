import { sendEmailVerification } from "firebase/auth";
import { auth } from './../../firebase.js'

export const sendEmail = async (req, res) => {
    try {
        sendEmailVerification(auth.currentUser)
        .then(() => {
            res.status(200)
            res.send("Email sent")
        });
    } catch (err) {
        res.status(502)
        res.send("Error")
        console.log(err)
    }
}

export const sendEmailFromBackend = (user) => {
    try {
        sendEmailVerification(user.user)
        .then(() => {
            return 200
        });
    } catch (err) {
        console.log(err)
        return 502
    }
}