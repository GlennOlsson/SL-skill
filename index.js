"use strict"
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')

const app = express();
const PORT = 4040;

let fileData = fs.readFileSync("settings.json");
if(!fileData) {
	throw new Error("No settings file");
}
//TODO: get api tokens from file

app.use(bodyParser.json());

app.post('/', (req, res) => {
	console.log("Request", req.body)
	let responseObject = {

	}

	res.send(JSON.stringify(responseObject));
});

app.listen(PORT, () => {
	console.log(`SL skill listening at http://localhost:${PORT}`);
});