const express = require('express');

const app = express();
const PORT = 3000;
const AWS = require('aws-sdk')

AWS.config.loadFromPath('./secrets/config.json');

const client = new AWS.DynamoDB.DocumentClient();

app.get('/', (req, res)=>{
	res.status(200);
	res.send("Welcome to root URL of Server");
});

app.get('/poi/all', (req, res) => {
	var params = {
        TableName: 'POI'
    };

    client.scan(params, (err, data) => {
        if (err) {
            res.status(404)
			res.send(err)
			console.log(err)
        } else {
            res.contentType = 'application/json';
			res.status(200)
            res.send(data.Items);
        }
    });
})

app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running, and App is listening on port "+ PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);
