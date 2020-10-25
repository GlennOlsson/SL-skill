const intentHandler = require("./intentHandler");

function handleLaunch(json, settings, callback) {
	callback({
		response: {
			outputSpeech: {
				type: "SSML",
				ssml:
					"<speak>This skill can help you with the <amazon:emotion name=\"excited\" intensity=\"high\"> transit schedule in Stockholm, Sweden</amazon:emotion></speak>",
			},
		},
		version: "1.0",
		sessionAttributes: {},
	})
}

function handleIntent(json, settings, callback) {
	const intent = json.request.intent
	switch(intent.name) {
		case "NextTrain":
			intentHandler.nextTrain(json, settings)
				.then(response => callback(response))
			break;
		default:
			callback(handleBadRequest("Intent is not supported", "The intent sent by Alexa is not supported by the skill at the moment. Sucks for you I guess"));
	}
}

function handleBadRequest(reasonTitle, reasonDesc) {
	const errorBody = {
		response: {
			outputSpeech: {
				type: "SSML",
				ssml:
					"<speak><amazon:emotion name='disappointed' intensity='high'> There was an error with the request. See the app for more information</amazon:emotion></speak>",
			},
			card: {
				type: "Simple",
				title: reasonTitle,
				content: reasonDesc,
			},
			shouldEndSession: false,
		},
		version: "1.0",
		sessionAttributes: {},
	};
	return errorBody;
}

module.exports = {
	handleLaunch,
	handleIntent,
	handleBadRequest,
};
