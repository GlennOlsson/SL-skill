"use strict"
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')

const requestHandler = require('./requestHandler');
const { response } = require('express');

const app = express();
const PORT = 4040;

let fileData = fs.readFileSync("settings.json");
if(!fileData) {
	throw new Error("No settings file");
}
//TODO: get api tokens from file

app.use(bodyParser.json());

app.post('/', (req, res) => {
	let body = req.body;

	let responseObject = {}

	switch(body.request.type) {
		case "LaunchRequest":
			responseObject = requestHandler.handleLaunch(body);
			break;
		case "IntentRequest":
			responseObject = requestHandler.handleIntent(body);
			break;
		case "SessionEndedRequest":
			res.send("");
			return 
		default:
			console.log("Request not supported");
			responseObject = requestHandler.handleBadRequest("The request is not supported", "The request sent by Alexa to the server is not supported. The request was \"" + body.request.type + "\". \r\rSucks for you I guess");
	}

	res.send(JSON.stringify(responseObject));
});

app.listen(PORT, () => {
	console.log(`SL skill listening at http://localhost:${PORT}`);
});