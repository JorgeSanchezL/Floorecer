import AWS from 'aws-sdk';
import Randomatic from 'randomatic'

AWS.config.update({ "accessKeyId": "AKIAYWWUAEJTCXGCC2WP", "secretAccessKey": "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", "region": "eu-west-3" })
const client = new AWS.DynamoDB.DocumentClient();

export const checkUserVerified = async (user, req, res) => {
    const params = {
        TableName: 'user',
        Key: {
            user_id: user
        },
    };

    client.scan(params, (err, data) => {
        if (err) { res.status(404).json(err); }
        else { return res.json({'verified': true}); }
    });
}

export const verifyCode = async (user, code, req, res) => {
    const params = {
        TableName: 'verify-code',
        Key: {
            user_id: user
        },
    };

    client.scan(params, (err, data) => {
        if (err) { res.status(404).json(err); }
        else { return res.json({'verified': code==data.Items.code}); }
    });
}

export const updateVerifyCode = async (user, req, res) => {
    const params = {
        TableName: 'verify-code',
        Key: {
            user_id: user,
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

export const sendEmail = () => {
    email(userMail, {
      subject: 'Verifica tu correo electrónico',
      body: 'Para poder utilizar Floorecer debes verificar tu cuenta. Para ello accede al siguiente enlace:'
    }).catch(console.error)
}