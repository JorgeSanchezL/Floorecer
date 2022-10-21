import AWS from 'aws-sdk';

export const sendEmail = async (req, res) => {
    try {
        req.body.user.sendEmailVerification()
        .then(() => {
            res.status(200)
            res.send("Email sent")
        });
    } catch (err) {
        res.status(502)
        res.send("Error")
    }
}