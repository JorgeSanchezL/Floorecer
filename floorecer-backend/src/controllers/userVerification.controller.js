import { sendEmailVerification } from "firebase/auth";

export const sendEmail = async (req, res) => {
    console.log(req.body)
    try {
        sendEmailVerification(req.body.user)
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