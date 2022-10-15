import AWS from 'aws-sdk';

AWS.config.update({ "accessKeyId": "AKIAYWWUAEJTCXGCC2WP", "secretAccessKey": "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", "region": "eu-west-3" })
const client = new AWS.DynamoDB.DocumentClient();

export const getAllPOI = async (req, res) => {
    const params = {
        TableName: 'POI'
    };

    client.scan(params, (err, data) => {
        if (err) { res.status(404).json(err); }
        else { res.json(data.Items); }
    });
}