import { sendEmailVerification } from "firebase/auth";

export const sendEmail = async (req, res) => {
    console.log(req)
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