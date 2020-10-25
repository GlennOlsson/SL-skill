"use strict"
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')

const requestHandler = require('./requestHandler')

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

	switch(body.request.type) {
		case "LaunchRequest":
			requestHandler.handleLaunch(body);
			break;
		case "IntentRequest":
			requestHandler.handleIntent(body);
			break;
		default:
			console.log("Request not supported");
			let errorBody = requestHandler.handleBadRequest("The request is not supported", "The request sent by Alexa to the server is not supported. The request was \"" + body.request.type + "\". Sucks for you I guess");
			res.send(JSON.stringify(errorBody));
	}

	res.send(JSON.stringify(responseObject));
});

app.listen(PORT, () => {
	console.log(`SL skill listening at http://localhost:${PORT}`);
});