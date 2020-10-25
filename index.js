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

const settings = JSON.parse(fileData);

app.use(bodyParser.json());

app.post('/', (req, res) => {
	let body = req.body;

	const callback = (response) => {
		res.send(response);
	}

	switch(body.request.type) {
		case "LaunchRequest":
			requestHandler.handleLaunch(body, settings, callback);
			break;
		case "IntentRequest":
			requestHandler.handleIntent(body, settings, callback);
			break;
		case "SessionEndedRequest":
			res.send("");
			return 
		default:
			console.log("Request not supported");
			res.send(requestHandler.handleBadRequest("The request is not supported", "The request sent by Alexa to the server is not supported. The request was \"" + body.request.type + "\". \r\rSucks for you I guess"));
	}

	res.send(JSON.stringify(responseObject));
});

app.listen(PORT, () => {
	console.log(`SL skill listening at http://localhost:${PORT}`);
});